const { faker } = require('@faker-js/faker');

const BasicStatus = {
  ENABLE: 1,
  DISABLE: 0
};

const PermissionType = {
  CATALOGUE: 0,
  MENU: 1,
  BUTTON: 'button'
};

const ORG_LIST = [
  {
    id: '1',
    name: 'East China Branch',
    status: BasicStatus.ENABLE,
    desc: 'paens aptus comitatus',
    order: 1,
    children: [
      {
        id: '1-1',
        name: 'R&D Department',
        status: BasicStatus.DISABLE,
        desc: '',
        order: 1
      },
      {
        id: '1-2',
        name: 'Marketing Department',
        status: BasicStatus.ENABLE,
        desc: '',
        order: 2
      },
      {
        id: '1-3',
        name: 'Finance Department',
        status: BasicStatus.ENABLE,
        desc: '',
        order: 3
      }
    ]
  },
  {
    id: '2',
    name: 'South China Branch',
    status: BasicStatus.ENABLE,
    desc: 'depraedor comparo cilicium',
    order: 2,
    children: [
      {
        id: '2-1',
        name: 'R&D Department',
        status: BasicStatus.DISABLE,
        desc: '',
        order: 1
      },
      {
        id: '2-2',
        name: 'Marketing Department',
        status: BasicStatus.ENABLE,
        desc: '',
        order: 2
      },
      {
        id: '2-3',
        name: 'Finance Department',
        status: BasicStatus.ENABLE,
        desc: '',
        order: 3
      }
    ]
  }
];

const DASHBOARD_PERMISSION = {
  id: '9100714781927703',
  parentId: '',
  label: 'sys.menu.dashboard',
  name: 'Dashboard',
  icon: 'ic-analysis',
  type: PermissionType.CATALOGUE,
  route: 'dashboard',
  order: 1,
  children: [
    {
      id: '8426999229400979',
      parentId: '9100714781927703',
      label: 'sys.menu.workbench',
      name: 'Workbench',
      type: PermissionType.MENU,
      route: 'workbench',
      component: '/dashboard/workbench/index.tsx',
    },
    {
      id: '9710971640510357',
      parentId: '9100714781927703',
      label: 'sys.menu.analysis',
      name: 'Analysis',
      type: PermissionType.MENU,
      route: 'analysis',
      component: '/dashboard/analysis/index.tsx',
    },
  ],
};

const MANAGEMENT_PERMISSION = {
  id: '0901673425580518',
  parentId: '',
  label: 'sys.menu.management',
  name: 'Management',
  icon: 'ic-management',
  type: PermissionType.CATALOGUE,
  route: 'management',
  order: 2,
  children: [
    {
      id: '2781684678535711',
      parentId: '0901673425580518',
      label: 'sys.menu.user.index',
      name: 'User',
      type: PermissionType.CATALOGUE,
      route: 'user',
      children: [
        {
          id: '4754063958766648',
          parentId: '2781684678535711',
          label: 'sys.menu.user.profile',
          name: 'Profile',
          type: PermissionType.MENU,
          route: 'profile',
          component: '/management/user/profile/index.tsx',
        },
        {
          id: '2516598794787938',
          parentId: '2781684678535711',
          label: 'sys.menu.user.account',
          name: 'Account',
          type: PermissionType.MENU,
          route: 'account',
          component: '/management/user/account/index.tsx',
        },
      ],
    },
    {
      id: '0249937641030250',
      parentId: '0901673425580518',
      label: 'sys.menu.system.index',
      name: 'System',
      type: PermissionType.CATALOGUE,
      route: 'system',
      children: [
        {
          id: '1985890042972842',
          parentId: '0249937641030250',
          label: 'sys.menu.system.organization',
          name: 'Organization',
          type: PermissionType.MENU,
          route: 'organization',
          component: '/management/system/organization/index.tsx',
        },
        {
          id: '4359580910369984',
          parentId: '0249937641030250',
          label: 'sys.menu.system.permission',
          name: 'Permission',
          type: PermissionType.MENU,
          route: 'permission',
          component: '/management/system/permission/index.tsx',
        },
        {
          id: '1689241785490759',
          parentId: '0249937641030250',
          label: 'sys.menu.system.role',
          name: 'Role',
          type: PermissionType.MENU,
          route: 'role',
          component: '/management/system/role/index.tsx',
        },
        {
          id: '0157880245365433',
          parentId: '0249937641030250',
          label: 'sys.menu.system.user',
          name: 'User',
          type: PermissionType.MENU,
          route: 'user',
          component: '/management/system/user/index.tsx',
        },
        {
          id: '0157880245365434',
          parentId: '0249937641030250',
          label: 'sys.menu.system.user_detail',
          name: 'User Detail',
          type: PermissionType.MENU,
          route: 'user/:id',
          component: '/management/system/user/detail.tsx',
          hide: true,
        },
      ],
    },
  ],
};

const COMPONENTS_PERMISSION = {
  id: '2271615060673773',
  parentId: '',
  label: 'sys.menu.components',
  name: 'Components',
  icon: 'solar:widget-5-bold-duotone',
  type: PermissionType.CATALOGUE,
  route: 'components',
  order: 3,
  children: [
    {
      id: '2478488238255411',
      parentId: '2271615060673773',
      label: 'sys.menu.icon',
      name: 'Icon',
      type: PermissionType.MENU,
      route: 'icon',
      component: '/components/icon/index.tsx',
    },
    {
      id: '6755238352318767',
      parentId: '2271615060673773',
      label: 'sys.menu.animate',
      name: 'Animate',
      type: PermissionType.MENU,
      route: 'animate',
      component: '/components/animate/index.tsx',
    },
    {
      id: '9992476513546805',
      parentId: '2271615060673773',
      label: 'sys.menu.scroll',
      name: 'Scroll',
      type: PermissionType.MENU,
      route: 'scroll',
      component: '/components/scroll/index.tsx',
    },
    {
      id: '1755562695856395',
      parentId: '2271615060673773',
      label: 'sys.menu.markdown',
      name: 'Markdown',
      type: PermissionType.MENU,
      route: 'markdown',
      component: '/components/markdown/index.tsx',
    },
    {
      id: '2122547769468069',
      parentId: '2271615060673773',
      label: 'sys.menu.editor',
      name: 'Editor',
      type: PermissionType.MENU,
      route: 'editor',
      component: '/components/editor/index.tsx',
    },
    {
      id: '2501920741714350',
      parentId: '2271615060673773',
      label: 'sys.menu.i18n',
      name: 'Multi Language',
      type: PermissionType.MENU,
      route: 'i18n',
      component: '/components/multi-language/index.tsx',
    },
    {
      id: '2013577074467956',
      parentId: '2271615060673773',
      label: 'sys.menu.upload',
      name: 'upload',
      type: PermissionType.MENU,
      route: 'upload',
      component: '/components/upload/index.tsx',
    },
  ],
};

const FUNCTIONS_PERMISSION = {
  id: '5031764626189639',
  parentId: '',
  label: 'sys.menu.functions',
  name: 'Functions',
  icon: 'solar:magic-stick-3-bold-duotone',
  type: PermissionType.CATALOGUE,
  route: 'functions',
  order: 4,
  children: [
    {
      id: '4576897176958772',
      parentId: '5031764626189639',
      label: 'sys.menu.clipboard',
      name: 'Clipboard',
      type: PermissionType.MENU,
      route: 'clipboard',
      component: '/functions/clipboard/index.tsx',
    },
    {
      id: '1268273945577987',
      parentId: '5031764626189639',
      label: 'sys.menu.qrcode',
      name: 'QR Code',
      type: PermissionType.MENU,
      route: 'qrcode',
      component: '/functions/qrcode/index.tsx',
    },
    {
      id: '4576897176958773',
      parentId: '5031764626189639',
      label: 'sys.menu.watermark',
      name: 'Watermark',
      type: PermissionType.MENU,
      route: 'watermark',
      component: '/functions/watermark/index.tsx',
    },
    {
      id: '4576897176958774',
      parentId: '5031764626189639',
      label: 'sys.menu.typography',
      name: 'Typography',
      type: PermissionType.MENU,
      route: 'typography',
      component: '/functions/typography/index.tsx',
    },
    {
      id: '4576897176958775',
      parentId: '5031764626189639',
      label: 'sys.menu.download',
      name: 'Download',
      type: PermissionType.MENU,
      route: 'download',
      component: '/functions/download/index.tsx',
    },
    {
      id: '4576897176958776',
      parentId: '5031764626189639',
      label: 'sys.menu.click-outside',
      name: 'Click Outside',
      type: PermissionType.MENU,
      route: 'click-outside',
      component: '/functions/click-outside/index.tsx',
    },
  ],
};

const MENU_LEVEL_PERMISSION = {
  id: '0194818428516575',
  parentId: '',
  label: 'sys.menu.menulevel.index',
  name: 'Menu Level',
  icon: 'solar:menu-dots-bold-duotone',
  type: PermissionType.CATALOGUE,
  route: 'menu-level',
  order: 5,
  children: [
    {
      id: '5194818428516575',
      parentId: '0194818428516575',
      label: 'sys.menu.menulevel.1a',
      name: 'Menu Level 1a',
      type: PermissionType.MENU,
      route: 'menu-level-1a',
      component: '/menu-level/menu-level-1a/index.tsx',
    },
    {
      id: '7572529636800586',
      parentId: '0194818428516575',
      label: 'sys.menu.menulevel.1b.index',
      name: 'Menu Level 1b',
      type: PermissionType.CATALOGUE,
      route: 'menu-level-1b',
      children: [
        {
          id: '3653745576583237',
          parentId: '7572529636800586',
          label: 'sys.menu.menulevel.1b.2a',
          name: 'Menu Level 2a',
          type: PermissionType.MENU,
          route: 'menu-level-2a',
          component: '/menu-level/menu-level-1b/menu-level-2a/index.tsx',
        },
        {
          id: '4873136353891364',
          parentId: '7572529636800586',
          label: 'sys.menu.menulevel.1b.2b.index',
          name: 'Menu Level 2b',
          type: PermissionType.CATALOGUE,
          route: 'menu-level-2b',
          children: [
            {
              id: '4233029726998055',
              parentId: '4873136353891364',
              label: 'sys.menu.menulevel.1b.2b.3a',
              name: 'Menu Level 3a',
              type: PermissionType.MENU,
              route: 'menu-level-3a',
              component: '/menu-level/menu-level-1b/menu-level-2b/menu-level-3a/index.tsx',
            },
            {
              id: '3298034742548454',
              parentId: '4873136353891364',
              label: 'sys.menu.menulevel.1b.2b.3b',
              name: 'Menu Level 3b',
              type: PermissionType.MENU,
              route: 'menu-level-3b',
              component: '/menu-level/menu-level-1b/menu-level-2b/menu-level-3b/index.tsx',
            },
          ],
        },
      ],
    },
  ],
};

const ERRORS_PERMISSION = {
  id: '9406067785553476',
  parentId: '',
  label: 'sys.menu.error.index',
  name: 'Error',
  icon: 'bxs:error-alt',
  type: PermissionType.CATALOGUE,
  route: 'error',
  order: 6,
  children: [
    {
      id: '8557056851997154',
      parentId: '9406067785553476',
      label: 'sys.menu.error.403',
      name: '403',
      type: PermissionType.MENU,
      route: '403',
      component: '/sys/error/Page403.tsx',
    },
    {
      id: '5095669208159005',
      parentId: '9406067785553476',
      label: 'sys.menu.error.404',
      name: '404',
      type: PermissionType.MENU,
      route: '404',
      component: '/sys/error/Page404.tsx',
    },
    {
      id: '0225992135973772',
      parentId: '9406067785553476',
      label: 'sys.menu.error.500',
      name: '500',
      type: PermissionType.MENU,
      route: '500',
      component: '/sys/error/Page500.tsx',
    },
  ],
};

const OTHERS_PERMISSION = [
  {
    id: '5733704222120995',
    parentId: '',
    label: 'sys.menu.frame',
    name: 'Frame',
    icon: 'ic_external',
    type: PermissionType.CATALOGUE,
    route: 'frame',
    children: [
      {
        id: '9884486809510480',
        parentId: '5733704222120995',
        label: 'sys.menu.external_link',
        name: 'External Link',
        type: PermissionType.MENU,
        route: 'external_link',
        hideTab: true,
        component: '/sys/others/iframe/external-link.tsx',
        frameSrc: 'https://ant.design/',
      },
      {
        id: '9299640886731819',
        parentId: '5733704222120995',
        label: 'sys.menu.iframe',
        name: 'Iframe',
        type: PermissionType.MENU,
        route: 'frame',
        component: '/sys/others/iframe/index.tsx',
        frameSrc: 'https://ant.design/',
      },
    ],
  },
  {
    id: '0941594969900756',
    parentId: '',
    label: 'sys.menu.blank',
    name: 'Disabled',
    icon: 'ic_blank',
    type: PermissionType.MENU,
    route: 'blank',
    component: '/sys/others/blank.tsx',
  },
];

const PERMISSION_LIST = [
  DASHBOARD_PERMISSION,
  MANAGEMENT_PERMISSION,
  COMPONENTS_PERMISSION,
  FUNCTIONS_PERMISSION,
  MENU_LEVEL_PERMISSION,
  ERRORS_PERMISSION,
  ...OTHERS_PERMISSION,
];

const ADMIN_ROLE = {
  id: '4281707933534332',
  name: 'Admin',
  label: 'admin',
  status: BasicStatus.ENABLE,
  order: 1,
  desc: 'Super Admin',
  permission: PERMISSION_LIST,
};

const TEST_ROLE = {
  id: '9931665660771476',
  name: 'Test',
  label: 'test',
  status: BasicStatus.ENABLE,
  order: 2,
  desc: 'test',
  permission: [DASHBOARD_PERMISSION, COMPONENTS_PERMISSION, FUNCTIONS_PERMISSION],
};

const USER_ROLE = {
  id: faker.string.uuid(),
  name: 'User',
  label: 'user',
  status: BasicStatus.ENABLE,
  order: 3,
  desc: 'Regular User',
  permission: [DASHBOARD_PERMISSION],
};

const ROLE_LIST = [ADMIN_ROLE, TEST_ROLE, USER_ROLE];


const ADMIN_USER = {
  id: 'b34719e1-ce46-457e-9575-99505ecee828',
  username: 'admin',
  email: faker.internet.email(),
  avatar: faker.image.avatar(),
  createdAt: faker.date.past(),
  updatedAt: faker.date.recent(),
  password: 'demo1234',
  role: ADMIN_ROLE,
  permissions: ADMIN_ROLE.permission,
};

const DEFAULT_USER = {
  id: 'efaa20ea-4dc5-47ee-a200-8a899be29494',
  username: 'user',
  password: 'demo1234',
  email: faker.internet.email(),
  avatar: faker.image.avatar(),
  createdAt: faker.date.past(),
  updatedAt: faker.date.recent(),
  role: USER_ROLE,
  permissions: USER_ROLE.permission,
};

const USER_LIST = [ADMIN_USER, DEFAULT_USER];

module.exports = {
  ORG_LIST,
  PERMISSION_LIST,
  ROLE_LIST,
  USER_LIST,
  BasicStatus,
  PermissionType
};