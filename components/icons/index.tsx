import {
  ListTodo,
  BookOpen,
  Lightbulb,
  Moon,
  HelpCircle,
  Clock,
  Trash2,
  Inbox,
  ArrowRight,
  Calendar,
  Layout,
  FolderOpen,
  FileText,
  Plus,
  Search,
  Settings,
  User,
  LogOut,
  ChevronDown,
  ChevronRight,
  MoreHorizontal,
  Check,
  X,
  GripVertical,
  Sparkles,
  Bot,
  Briefcase,
  Heart,
  Brain,
  Dumbbell,
  Code,
  Palette,
  Music,
  Home,
  Star,
  Flag,
  Target,
  Zap,
  Coffee,
  Bookmark,
  Globe,
  MessageSquare,
  Send,
  Link,
  ExternalLink,
  Download,
  Upload,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Bell,
  BellOff,
  Sun,
  Laptop,
  Smartphone,
  Chrome,
  Hash,
  AtSign,
  Folder,
  Archive,
  Gift,
  Plane,
  Car,
  MapPin,
  Camera,
  Film,
  Headphones,
  Gamepad2,
  Utensils,
  ShoppingCart,
  Wallet,
  CreditCard,
  Building,
  GraduationCap,
  Book,
  Newspaper,
  Megaphone,
  Users,
  UserPlus,
  Phone,
  Mail,
  Calendar as CalendarIcon,
  ClipboardList,
  CheckSquare,
  Circle,
  type LucideIcon,
} from 'lucide-react';

// Destination icons mapping
export const DESTINATION_ICONS: Record<string, LucideIcon> = {
  backlog: ListTodo,
  reference: BookOpen,
  incubating: Lightbulb,
  someday: Moon,
  questions: HelpCircle,
  waiting: Clock,
  trash: Trash2,
};

// Default destination data
export const DEFAULT_DESTINATIONS = [
  { slug: 'backlog', name: 'Backlog', icon: 'list-todo', description: 'Actions without dates' },
  { slug: 'reference', name: 'Reference', icon: 'book-open', description: 'Info to consult later' },
  { slug: 'incubating', name: 'Incubating', icon: 'lightbulb', description: 'Ideas to develop' },
  { slug: 'someday', name: 'Someday', icon: 'moon', description: 'Maybe one day' },
  { slug: 'questions', name: 'Questions', icon: 'help-circle', description: 'Things to research' },
  { slug: 'waiting', name: 'Waiting', icon: 'clock', description: 'Delegated/waiting on others' },
  { slug: 'trash', name: 'Trash', icon: 'trash-2', description: 'Things to forget' },
];

// Icon picker option type
export interface IconOption {
  name: string;
  value: string;
  icon: LucideIcon;
  category: string;
}

// Icon picker options (for user selection when creating Spaces, Projects, etc.)
export const ICON_PICKER_OPTIONS: IconOption[] = [
  // General
  { name: 'Star', value: 'star', icon: Star, category: 'General' },
  { name: 'Flag', value: 'flag', icon: Flag, category: 'General' },
  { name: 'Target', value: 'target', icon: Target, category: 'General' },
  { name: 'Bookmark', value: 'bookmark', icon: Bookmark, category: 'General' },
  { name: 'Zap', value: 'zap', icon: Zap, category: 'General' },
  { name: 'Heart', value: 'heart', icon: Heart, category: 'General' },
  { name: 'Check', value: 'check', icon: Check, category: 'General' },
  { name: 'Circle', value: 'circle', icon: Circle, category: 'General' },
  { name: 'Inbox', value: 'inbox', icon: Inbox, category: 'General' },
  { name: 'Archive', value: 'archive', icon: Archive, category: 'General' },

  // Work
  { name: 'Briefcase', value: 'briefcase', icon: Briefcase, category: 'Work' },
  { name: 'Laptop', value: 'laptop', icon: Laptop, category: 'Work' },
  { name: 'Globe', value: 'globe', icon: Globe, category: 'Work' },
  { name: 'Message', value: 'message-square', icon: MessageSquare, category: 'Work' },
  { name: 'Send', value: 'send', icon: Send, category: 'Work' },
  { name: 'File', value: 'file-text', icon: FileText, category: 'Work' },
  { name: 'Folder', value: 'folder', icon: Folder, category: 'Work' },
  { name: 'Building', value: 'building', icon: Building, category: 'Work' },
  { name: 'Users', value: 'users', icon: Users, category: 'Work' },
  { name: 'Phone', value: 'phone', icon: Phone, category: 'Work' },
  { name: 'Mail', value: 'mail', icon: Mail, category: 'Work' },
  { name: 'Megaphone', value: 'megaphone', icon: Megaphone, category: 'Work' },

  // Personal
  { name: 'Home', value: 'home', icon: Home, category: 'Personal' },
  { name: 'Coffee', value: 'coffee', icon: Coffee, category: 'Personal' },
  { name: 'Music', value: 'music', icon: Music, category: 'Personal' },
  { name: 'Smartphone', value: 'smartphone', icon: Smartphone, category: 'Personal' },
  { name: 'Gift', value: 'gift', icon: Gift, category: 'Personal' },
  { name: 'Shopping', value: 'shopping-cart', icon: ShoppingCart, category: 'Personal' },
  { name: 'Wallet', value: 'wallet', icon: Wallet, category: 'Personal' },
  { name: 'Credit Card', value: 'credit-card', icon: CreditCard, category: 'Personal' },

  // Health & Wellness
  { name: 'Dumbbell', value: 'dumbbell', icon: Dumbbell, category: 'Health' },
  { name: 'Brain', value: 'brain', icon: Brain, category: 'Health' },
  { name: 'Utensils', value: 'utensils', icon: Utensils, category: 'Health' },

  // Travel
  { name: 'Plane', value: 'plane', icon: Plane, category: 'Travel' },
  { name: 'Car', value: 'car', icon: Car, category: 'Travel' },
  { name: 'Map Pin', value: 'map-pin', icon: MapPin, category: 'Travel' },

  // Creative & Tech
  { name: 'Code', value: 'code', icon: Code, category: 'Creative' },
  { name: 'Palette', value: 'palette', icon: Palette, category: 'Creative' },
  { name: 'Lightbulb', value: 'lightbulb', icon: Lightbulb, category: 'Creative' },
  { name: 'Camera', value: 'camera', icon: Camera, category: 'Creative' },
  { name: 'Film', value: 'film', icon: Film, category: 'Creative' },
  { name: 'Headphones', value: 'headphones', icon: Headphones, category: 'Creative' },
  { name: 'Gamepad', value: 'gamepad-2', icon: Gamepad2, category: 'Creative' },

  // Education
  { name: 'Graduation', value: 'graduation-cap', icon: GraduationCap, category: 'Education' },
  { name: 'Book', value: 'book', icon: Book, category: 'Education' },
  { name: 'Newspaper', value: 'newspaper', icon: Newspaper, category: 'Education' },

  // Organization
  { name: 'Calendar', value: 'calendar', icon: CalendarIcon, category: 'Organization' },
  { name: 'Clipboard', value: 'clipboard-list', icon: ClipboardList, category: 'Organization' },
  { name: 'Checklist', value: 'check-square', icon: CheckSquare, category: 'Organization' },
  { name: 'List', value: 'list-todo', icon: ListTodo, category: 'Organization' },
  { name: 'Settings', value: 'settings', icon: Settings, category: 'Organization' },
];

// Get all unique categories
export const ICON_CATEGORIES = [...new Set(ICON_PICKER_OPTIONS.map(opt => opt.category))];

// Icon name to component mapping (for rendering from database string)
export const ICON_MAP: Record<string, LucideIcon> = {
  // Destinations
  'list-todo': ListTodo,
  'book-open': BookOpen,
  'lightbulb': Lightbulb,
  'moon': Moon,
  'help-circle': HelpCircle,
  'clock': Clock,
  'trash-2': Trash2,

  // All icon picker options
  'star': Star,
  'flag': Flag,
  'target': Target,
  'bookmark': Bookmark,
  'zap': Zap,
  'heart': Heart,
  'check': Check,
  'circle': Circle,
  'inbox': Inbox,
  'archive': Archive,
  'briefcase': Briefcase,
  'laptop': Laptop,
  'globe': Globe,
  'message-square': MessageSquare,
  'send': Send,
  'file-text': FileText,
  'folder': Folder,
  'building': Building,
  'users': Users,
  'phone': Phone,
  'mail': Mail,
  'megaphone': Megaphone,
  'home': Home,
  'coffee': Coffee,
  'music': Music,
  'smartphone': Smartphone,
  'gift': Gift,
  'shopping-cart': ShoppingCart,
  'wallet': Wallet,
  'credit-card': CreditCard,
  'dumbbell': Dumbbell,
  'brain': Brain,
  'utensils': Utensils,
  'plane': Plane,
  'car': Car,
  'map-pin': MapPin,
  'code': Code,
  'palette': Palette,
  'camera': Camera,
  'film': Film,
  'headphones': Headphones,
  'gamepad-2': Gamepad2,
  'graduation-cap': GraduationCap,
  'book': Book,
  'newspaper': Newspaper,
  'calendar': CalendarIcon,
  'clipboard-list': ClipboardList,
  'check-square': CheckSquare,
  'settings': Settings,
  'sparkles': Sparkles,
  'bot': Bot,
  'plus': Plus,
  'search': Search,
  'user': User,
  'log-out': LogOut,
  'chevron-down': ChevronDown,
  'chevron-right': ChevronRight,
  'more-horizontal': MoreHorizontal,
  'x': X,
  'grip-vertical': GripVertical,
  'link': Link,
  'external-link': ExternalLink,
  'download': Download,
  'upload': Upload,
  'eye': Eye,
  'eye-off': EyeOff,
  'lock': Lock,
  'unlock': Unlock,
  'bell': Bell,
  'bell-off': BellOff,
  'sun': Sun,
  'chrome': Chrome,
  'hash': Hash,
  'at-sign': AtSign,
  'arrow-right': ArrowRight,
  'layout': Layout,
  'folder-open': FolderOpen,
  'user-plus': UserPlus,
};

// Color palette for user selection
export interface ColorOption {
  name: string;
  value: string;
  hex: string;
  bg: string;
  bgSubtle: string;
  text: string;
  border: string;
}

export const COLOR_PALETTE: ColorOption[] = [
  { name: 'Red', value: 'red', hex: '#ef4444', bg: 'bg-red-500', bgSubtle: 'bg-red-500/10', text: 'text-red-500', border: 'border-red-500/30' },
  { name: 'Orange', value: 'orange', hex: '#f97316', bg: 'bg-orange-500', bgSubtle: 'bg-orange-500/10', text: 'text-orange-500', border: 'border-orange-500/30' },
  { name: 'Amber', value: 'amber', hex: '#f59e0b', bg: 'bg-amber-500', bgSubtle: 'bg-amber-500/10', text: 'text-amber-500', border: 'border-amber-500/30' },
  { name: 'Yellow', value: 'yellow', hex: '#eab308', bg: 'bg-yellow-500', bgSubtle: 'bg-yellow-500/10', text: 'text-yellow-500', border: 'border-yellow-500/30' },
  { name: 'Lime', value: 'lime', hex: '#84cc16', bg: 'bg-lime-500', bgSubtle: 'bg-lime-500/10', text: 'text-lime-500', border: 'border-lime-500/30' },
  { name: 'Green', value: 'green', hex: '#22c55e', bg: 'bg-green-500', bgSubtle: 'bg-green-500/10', text: 'text-green-500', border: 'border-green-500/30' },
  { name: 'Emerald', value: 'emerald', hex: '#10b981', bg: 'bg-emerald-500', bgSubtle: 'bg-emerald-500/10', text: 'text-emerald-500', border: 'border-emerald-500/30' },
  { name: 'Cyan', value: 'cyan', hex: '#06b6d4', bg: 'bg-cyan-500', bgSubtle: 'bg-cyan-500/10', text: 'text-cyan-500', border: 'border-cyan-500/30' },
  { name: 'Blue', value: 'blue', hex: '#3b82f6', bg: 'bg-blue-500', bgSubtle: 'bg-blue-500/10', text: 'text-blue-500', border: 'border-blue-500/30' },
  { name: 'Indigo', value: 'indigo', hex: '#6366f1', bg: 'bg-indigo-500', bgSubtle: 'bg-indigo-500/10', text: 'text-indigo-500', border: 'border-indigo-500/30' },
  { name: 'Purple', value: 'purple', hex: '#a855f7', bg: 'bg-purple-500', bgSubtle: 'bg-purple-500/10', text: 'text-purple-500', border: 'border-purple-500/30' },
  { name: 'Pink', value: 'pink', hex: '#ec4899', bg: 'bg-pink-500', bgSubtle: 'bg-pink-500/10', text: 'text-pink-500', border: 'border-pink-500/30' },
];

// Helper to get color by value
export function getColorByValue(value: string): ColorOption | undefined {
  return COLOR_PALETTE.find(c => c.value === value);
}

// Helper to get icon by name
export function getIconByName(name: string): LucideIcon | undefined {
  return ICON_MAP[name];
}

// Get a suggested color (cycles through palette based on existing count)
export function getSuggestedColor(existingCount: number): ColorOption {
  return COLOR_PALETTE[existingCount % COLOR_PALETTE.length];
}

// Re-export commonly used icons for convenience
export {
  ListTodo,
  BookOpen,
  Lightbulb,
  Moon,
  HelpCircle,
  Clock,
  Trash2,
  Inbox,
  ArrowRight,
  Calendar,
  Layout,
  FolderOpen,
  FileText,
  Plus,
  Search,
  Settings,
  User,
  LogOut,
  ChevronDown,
  ChevronRight,
  MoreHorizontal,
  Check,
  X,
  GripVertical,
  Sparkles,
  Bot,
  Briefcase,
  Heart,
  Brain,
  Dumbbell,
  Code,
  Palette,
  Music,
  Home,
  Star,
  Flag,
  Target,
  Zap,
  Coffee,
  Bookmark,
  Globe,
  MessageSquare,
  Send,
  Link,
  ExternalLink,
  Download,
  Upload,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Bell,
  BellOff,
  Sun,
  Laptop,
  Smartphone,
  Chrome,
  Hash,
  AtSign,
  Folder,
};
