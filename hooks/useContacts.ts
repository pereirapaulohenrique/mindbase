'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { Contact } from '@/types/database';

export function useContacts(userId: string) {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchContacts = useCallback(async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .eq('user_id', userId)
      .order('name');

    if (error) {
      console.error('Failed to fetch contacts:', error);
    } else {
      setContacts((data || []) as Contact[]);
    }
    setIsLoading(false);
  }, [userId]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const addContact = useCallback(
    async (contact: { name: string; email?: string | null; phone?: string | null; notes?: string | null }) => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('contacts')
        .insert({ ...contact, user_id: userId } as Record<string, unknown>)
        .select()
        .single();

      if (error) throw error;
      const newContact = data as unknown as Contact;
      setContacts((prev: Contact[]) =>
        [...prev, newContact].sort((a: Contact, b: Contact) => a.name.localeCompare(b.name))
      );
      return newContact;
    },
    [userId]
  );

  const updateContact = useCallback(
    async (id: string, updates: { name?: string; email?: string | null; phone?: string | null; notes?: string | null }) => {
      const supabase = createClient();
      const { error } = await supabase
        .from('contacts')
        .update(updates as Record<string, unknown>)
        .eq('id', id);

      if (error) throw error;
      setContacts((prev: Contact[]) =>
        prev
          .map((c: Contact) => (c.id === id ? { ...c, ...updates } as Contact : c))
          .sort((a: Contact, b: Contact) => a.name.localeCompare(b.name))
      );
    },
    []
  );

  const deleteContact = useCallback(async (id: string) => {
    const supabase = createClient();
    const { error } = await supabase.from('contacts').delete().eq('id', id);

    if (error) throw error;
    setContacts((prev: Contact[]) => prev.filter((c: Contact) => c.id !== id));
  }, []);

  return {
    contacts,
    isLoading,
    addContact,
    updateContact,
    deleteContact,
    refetch: fetchContacts,
  };
}
