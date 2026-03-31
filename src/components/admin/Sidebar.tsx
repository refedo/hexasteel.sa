import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  HomeIcon,
  UsersIcon,
  FolderIcon,
  DocumentTextIcon,
  CubeIcon,
  ChatBubbleLeftRightIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
  ShieldCheckIcon,
  BookOpenIcon,
  BriefcaseIcon,
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: HomeIcon },
  { name: 'Projects', href: '/admin/projects', icon: FolderIcon },
  { name: 'Team', href: '/admin/team', icon: UsersIcon },
  { name: 'Products', href: '/admin/products', icon: CubeIcon },
  { name: 'Blog Posts', href: '/admin/blog', icon: DocumentTextIcon },
  { name: 'Testimonials', href: '/admin/testimonials', icon: ChatBubbleLeftRightIcon },
  { name: 'FAQ', href: '/admin/faq', icon: QuestionMarkCircleIcon },
  { name: 'Certifications', href: '/admin/certifications', icon: ShieldCheckIcon },
  { name: 'Knowledge Center', href: '/admin/knowledge', icon: BookOpenIcon },
  { name: 'Applications', href: '/admin/applications', icon: BriefcaseIcon },
  { name: 'Settings', href: '/admin/settings', icon: Cog6ToothIcon },
];

interface SidebarProps {
  onSignOut: () => void;
}

export default function Sidebar({ onSignOut }: SidebarProps) {
  const router = useRouter();

  return (
    <nav className="flex flex-1 flex-col">
      <ul role="list" className="flex flex-1 flex-col gap-y-7">
        <li>
          <ul role="list" className="-mx-2 space-y-1">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`
                    group flex gap-x-3 rounded-md p-2 text-sm font-semibold
                    ${router.pathname === item.href || (item.href !== '/admin' && router.pathname.startsWith(item.href))
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                    }
                  `}
                >
                  <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </li>
        <li className="mt-auto">
          <button
            onClick={onSignOut}
            className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold text-gray-400 hover:bg-gray-800 hover:text-white w-full"
          >
            <span className="truncate">Sign out</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}
