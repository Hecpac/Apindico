import {
  Ruler,
  Droplet,
  PenTool,
  ClipboardList,
  Map,
  Search,
  Lock,
  Trash2,
  Video,
  Wrench,
  Truck,
  LucideIcon,
} from "lucide-react"

export const SERVICE_ICON_MAP: Record<string, LucideIcon> = {
  Ruler,
  Droplet,
  PenTool,
  ClipboardList,
  Map,
  Search,
  Lock,
  Trash2,
  Video,
  Wrench,
  Truck,
}

export const getServiceIcon = (icon?: string): LucideIcon | undefined =>
  icon ? SERVICE_ICON_MAP[icon] : undefined
