import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';
import fileTextFill from '@iconify/icons-eva/file-text-fill';
import lockFill from '@iconify/icons-eva/lock-fill';
import personAddFill from '@iconify/icons-eva/person-add-fill';
import alertTriangleFill from '@iconify/icons-eva/alert-triangle-fill';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon(pieChart2Fill)
  },
  {
    title: 'Donation List',
    path: '/dashboard/donation',
    icon: getIcon(peopleFill)
  },
  {
    title: 'Contact Details',
    path: '/dashboard/contact',
    icon: getIcon(peopleFill)
  },
  {
    title: 'Contact Inquiry',
    path: '/dashboard/inquiry-contacts',
    icon: getIcon(pieChart2Fill)
  },
  {
    title: 'Front Setting',
    path: '/dashboard/front-setting',
    icon: getIcon(pieChart2Fill)
  },
  {
    title: 'Gallery Image',
    path: '/dashboard/gallery-image',
    icon: getIcon(pieChart2Fill)
  },
  {
    title: 'Press Releases',
    path: '/dashboard/press-releases',
    icon: getIcon(pieChart2Fill)
  },
  {
    title: 'Annual Reports',
    path: '/dashboard/annual-reports',
    icon: getIcon(pieChart2Fill)
  },
];

export default sidebarConfig;
