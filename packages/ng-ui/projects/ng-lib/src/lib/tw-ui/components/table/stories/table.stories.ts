const mockData = [
  {
    id: 'Atlas',
    roles: {
      id: 'field_9',
      type: 'custom-select',
      key: 'Atlas',
      value: '',
      validation: [],
      label: '',
      placeholder: 'Atlas',
      description: '',
      props: {
        isMultipleTag: true,
        options: [
          {
            id: 'instance-admin',
            label: 'Instance Administrator',
            value: 'instance-admin',
          },
          {
            id: 'instance-manager',
            label: 'Instance Manager',
            value: 'instance-manager',
          },
          {
            id: 'instance-reader',
            label: 'Instance Reader',
            value: 'instance-reader',
          },
          {
            id: 'manifest-admin',
            label: 'Manifest Administrator',
            value: 'manifest-admin',
          },
          {
            id: 'manifest-manager',
            label: 'Manifest Manager',
            value: 'manifest-manager',
          },
          {
            id: 'manifest-reader',
            label: 'Manifest Reader',
            value: 'manifest-reader',
          },
          {
            id: 'registry-admin',
            label: 'Registry Administrator',
            value: 'registry-admin',
          },
          {
            id: 'registry-manager',
            label: 'Registry Manager',
            value: 'registry-manager',
          },
          {
            id: 'registry-reader',
            label: 'Registry Reader',
            value: 'registry-reader',
          },
        ],
      },
      formControl: {
        _pendingDirty: false,
        _hasOwnPendingAsyncValidator: false,
        _pendingTouched: false,
        _parent: null,
        pristine: true,
        touched: false,
        _onDisabledChange: [],
        _rawValidators: [],
        _composedValidatorFn: null,
        _rawAsyncValidators: null,
        _composedAsyncValidatorFn: null,
        defaultValue: null,
        _onChange: [],
        _pendingChange: false,
        _pendingValue: '',
        value: '',
        valueChanges: {
          closed: false,
          currentObservers: null,
          observers: [],
          isStopped: false,
          hasError: false,
          thrownError: null,
          __isAsync: false,
        },
        statusChanges: {
          closed: false,
          currentObservers: null,
          observers: [],
          isStopped: false,
          hasError: false,
          thrownError: null,
          __isAsync: false,
        },
        status: 'VALID',
        errors: null,
      },
    },
  },
  {
    id: 'atlas-deploy',
    roles: {
      id: 'field_10',
      type: 'custom-select',
      key: 'atlas-deploy',
      value: '',
      validation: [],
      label: '',
      placeholder: 'atlas-deploy',
      description: '',
      props: {
        isMultipleTag: true,
        options: [
          {
            id: 'registry:read',
            label: 'Registry Read',
            value: 'registry:read',
          },
          {
            id: 'registry:write',
            label: 'Registry Write',
            value: 'registry:write',
          },
          {
            id: 'manifests:read',
            label: 'Manifests Read',
            value: 'manifests:read',
          },
          {
            id: 'manifests:write',
            label: 'Manifests Write',
            value: 'manifests:write',
          },
          {
            id: 'instances:read',
            label: 'Instances Read',
            value: 'instances:read',
          },
          {
            id: 'instances:write',
            label: 'Instances Write',
            value: 'instances:write',
          },
          {
            id: 'admin',
            label: 'Deploy Admin',
            value: 'admin',
          },
        ],
      },
      formControl: {
        _pendingDirty: false,
        _hasOwnPendingAsyncValidator: false,
        _pendingTouched: false,
        _parent: null,
        pristine: true,
        touched: false,
        _onDisabledChange: [],
        _rawValidators: [],
        _composedValidatorFn: null,
        _rawAsyncValidators: null,
        _composedAsyncValidatorFn: null,
        defaultValue: null,
        _onChange: [],
        _pendingChange: false,
        _pendingValue: '',
        value: '',
        valueChanges: {
          closed: false,
          currentObservers: null,
          observers: [],
          isStopped: false,
          hasError: false,
          thrownError: null,
          __isAsync: false,
        },
        statusChanges: {
          closed: false,
          currentObservers: null,
          observers: [],
          isStopped: false,
          hasError: false,
          thrownError: null,
          __isAsync: false,
        },
        status: 'VALID',
        errors: null,
      },
    },
  },
  {
    id: 'atlas-iam',
    roles: {
      id: 'field_11',
      type: 'custom-select',
      key: 'atlas-iam',
      value: '',
      validation: [],
      label: '',
      placeholder: 'atlas-iam',
      description: '',
      props: {
        isMultipleTag: true,
        options: [
          {
            id: 'orgs:read',
            label: 'Orgs Read',
            value: 'orgs:read',
          },
          {
            id: 'orgs:write',
            label: 'Orgs Write',
            value: 'orgs:write',
          },
          {
            id: 'org-grants:read',
            label: 'Org Grants Read',
            value: 'org-grants:read',
          },
          {
            id: 'services:read',
            label: 'Services Read',
            value: 'services:read',
          },
          {
            id: 'services:write',
            label: 'Services Write',
            value: 'services:write',
          },
          {
            id: 'users:read',
            label: 'Users Read',
            value: 'users:read',
          },
          {
            id: 'users:write',
            label: 'Users Write',
            value: 'users:write',
          },
          {
            id: 'user-grants:read',
            label: 'User Grants Read',
            value: 'user-grants:read',
          },
          {
            id: 'user-grants:write',
            label: 'User Grants Write',
            value: 'user-grants:write',
          },
          {
            id: 'admin',
            label: 'IAM Admin',
            value: 'admin',
          },
          {
            id: 'org-grants:write',
            label: 'Orgs Grants Write',
            value: 'org-grants:write',
          },
        ],
      },
      formControl: {
        _pendingDirty: false,
        _hasOwnPendingAsyncValidator: false,
        _pendingTouched: false,
        _parent: null,
        pristine: true,
        touched: false,
        _onDisabledChange: [],
        _rawValidators: [],
        _composedValidatorFn: null,
        _rawAsyncValidators: null,
        _composedAsyncValidatorFn: null,
        defaultValue: null,
        _onChange: [],
        _pendingChange: false,
        _pendingValue: '',
        value: '',
        valueChanges: {
          closed: false,
          currentObservers: null,
          observers: [],
          isStopped: false,
          hasError: false,
          thrownError: null,
          __isAsync: false,
        },
        statusChanges: {
          closed: false,
          currentObservers: null,
          observers: [],
          isStopped: false,
          hasError: false,
          thrownError: null,
          __isAsync: false,
        },
        status: 'VALID',
        errors: null,
      },
    },
  },
  {
    id: 'atlas-chronicle',
    roles: {
      id: 'field_12',
      type: 'custom-select',
      key: 'atlas-chronicle',
      value: '',
      validation: [],
      label: '',
      placeholder: 'atlas-chronicle',
      description: '',
      props: {
        isMultipleTag: true,
        options: [
          {
            id: 'metrics:read',
            label: 'Metrics Read',
            value: 'metrics:read',
          },
          {
            id: 'log:read',
            label: 'Log Read',
            value: 'log:read',
          },
          {
            id: 'admin',
            label: 'Chronicle Admin',
            value: 'admin',
          },
        ],
      },
      formControl: {
        _pendingDirty: false,
        _hasOwnPendingAsyncValidator: false,
        _pendingTouched: false,
        _parent: null,
        pristine: true,
        touched: false,
        _onDisabledChange: [],
        _rawValidators: [],
        _composedValidatorFn: null,
        _rawAsyncValidators: null,
        _composedAsyncValidatorFn: null,
        defaultValue: null,
        _onChange: [],
        _pendingChange: false,
        _pendingValue: '',
        value: '',
        valueChanges: {
          closed: false,
          currentObservers: null,
          observers: [],
          isStopped: false,
          hasError: false,
          thrownError: null,
          __isAsync: false,
        },
        statusChanges: {
          closed: false,
          currentObservers: null,
          observers: [],
          isStopped: false,
          hasError: false,
          thrownError: null,
          __isAsync: false,
        },
        status: 'VALID',
        errors: null,
      },
    },
  },
  {
    id: 'httpbin',
    roles: {
      id: 'field_13',
      type: 'custom-select',
      key: 'httpbin',
      value: '',
      validation: [],
      label: '',
      placeholder: 'httpbin',
      description: '',
      props: {
        isMultipleTag: true,
        options: [
          {
            id: 'read',
            label: 'Read only',
            value: 'read',
          },
        ],
      },
      formControl: {
        _pendingDirty: false,
        _hasOwnPendingAsyncValidator: false,
        _pendingTouched: false,
        _parent: null,
        pristine: true,
        touched: false,
        _onDisabledChange: [],
        _rawValidators: [],
        _composedValidatorFn: null,
        _rawAsyncValidators: null,
        _composedAsyncValidatorFn: null,
        defaultValue: null,
        _onChange: [],
        _pendingChange: false,
        _pendingValue: '',
        value: '',
        valueChanges: {
          closed: false,
          currentObservers: null,
          observers: [],
          isStopped: false,
          hasError: false,
          thrownError: null,
          __isAsync: false,
        },
        statusChanges: {
          closed: false,
          currentObservers: null,
          observers: [],
          isStopped: false,
          hasError: false,
          thrownError: null,
          __isAsync: false,
        },
        status: 'VALID',
        errors: null,
      },
    },
  },
  {
    id: 'envoy-tools-standalone',
    roles: {
      id: 'field_14',
      type: 'custom-select',
      key: 'envoy-tools-standalone',
      value: '',
      validation: [],
      label: '',
      placeholder: 'envoy-tools-standalone',
      description: '',
      props: {
        isMultipleTag: true,
        options: [
          {
            id: 'user',
            label: 'user',
            value: 'user',
          },
        ],
      },
      formControl: {
        _pendingDirty: false,
        _hasOwnPendingAsyncValidator: false,
        _pendingTouched: false,
        _parent: null,
        pristine: true,
        touched: false,
        _onDisabledChange: [],
        _rawValidators: [],
        _composedValidatorFn: null,
        _rawAsyncValidators: null,
        _composedAsyncValidatorFn: null,
        defaultValue: null,
        _onChange: [],
        _pendingChange: false,
        _pendingValue: '',
        value: '',
        valueChanges: {
          closed: false,
          currentObservers: null,
          observers: [],
          isStopped: false,
          hasError: false,
          thrownError: null,
          __isAsync: false,
        },
        statusChanges: {
          closed: false,
          currentObservers: null,
          observers: [],
          isStopped: false,
          hasError: false,
          thrownError: null,
          __isAsync: false,
        },
        status: 'VALID',
        errors: null,
      },
    },
  },
  {
    id: 'semantic-dashboard',
    roles: {
      id: 'field_15',
      type: 'custom-select',
      key: 'semantic-dashboard',
      value: '',
      validation: [],
      label: '',
      placeholder: 'semantic-dashboard',
      description: '',
      props: {
        isMultipleTag: true,
        options: [
          {
            id: 'access',
            label: 'API Access',
            value: 'access',
          },
        ],
      },
      formControl: {
        _pendingDirty: false,
        _hasOwnPendingAsyncValidator: false,
        _pendingTouched: false,
        _parent: null,
        pristine: true,
        touched: false,
        _onDisabledChange: [],
        _rawValidators: [],
        _composedValidatorFn: null,
        _rawAsyncValidators: null,
        _composedAsyncValidatorFn: null,
        defaultValue: null,
        _onChange: [],
        _pendingChange: false,
        _pendingValue: '',
        value: '',
        valueChanges: {
          closed: false,
          currentObservers: null,
          observers: [],
          isStopped: false,
          hasError: false,
          thrownError: null,
          __isAsync: false,
        },
        statusChanges: {
          closed: false,
          currentObservers: null,
          observers: [],
          isStopped: false,
          hasError: false,
          thrownError: null,
          __isAsync: false,
        },
        status: 'VALID',
        errors: null,
      },
    },
  },
  {
    id: 'foo-service',
    roles: {
      id: 'field_16',
      type: 'custom-select',
      key: 'foo-service',
      value: '',
      validation: [],
      label: '',
      placeholder: 'foo-service',
      description: '',
      props: {
        isMultipleTag: true,
        options: [
          {
            id: 'foo-read',
            label: 'Foo Read',
            value: 'foo-read',
          },
        ],
      },
      formControl: {
        _pendingDirty: false,
        _hasOwnPendingAsyncValidator: false,
        _pendingTouched: false,
        _parent: null,
        pristine: true,
        touched: false,
        _onDisabledChange: [],
        _rawValidators: [],
        _composedValidatorFn: null,
        _rawAsyncValidators: null,
        _composedAsyncValidatorFn: null,
        defaultValue: null,
        _onChange: [],
        _pendingChange: false,
        _pendingValue: '',
        value: '',
        valueChanges: {
          closed: false,
          currentObservers: null,
          observers: [],
          isStopped: false,
          hasError: false,
          thrownError: null,
          __isAsync: false,
        },
        statusChanges: {
          closed: false,
          currentObservers: null,
          observers: [],
          isStopped: false,
          hasError: false,
          thrownError: null,
          __isAsync: false,
        },
        status: 'VALID',
        errors: null,
      },
    },
  },
  {
    id: 'atlas-archetype-controller',
    roles: {
      id: 'field_17',
      type: 'custom-select',
      key: 'atlas-archetype-controller',
      value: '',
      validation: [],
      label: '',
      placeholder: 'atlas-archetype-controller',
      description: '',
      props: {
        isMultipleTag: true,
        options: [],
      },
      formControl: {
        _pendingDirty: false,
        _hasOwnPendingAsyncValidator: false,
        _pendingTouched: false,
        _parent: null,
        pristine: true,
        touched: false,
        _onDisabledChange: [],
        _rawValidators: [],
        _composedValidatorFn: null,
        _rawAsyncValidators: null,
        _composedAsyncValidatorFn: null,
        defaultValue: null,
        _onChange: [],
        _pendingChange: false,
        _pendingValue: '',
        value: '',
        valueChanges: {
          closed: false,
          currentObservers: null,
          observers: [],
          isStopped: false,
          hasError: false,
          thrownError: null,
          __isAsync: false,
        },
        statusChanges: {
          closed: false,
          currentObservers: null,
          observers: [],
          isStopped: false,
          hasError: false,
          thrownError: null,
          __isAsync: false,
        },
        status: 'VALID',
        errors: null,
      },
    },
  },
  {
    id: 'Emissary-01hq0z29zf43a07gp29p98qmwk',
    roles: {
      id: 'field_18',
      type: 'custom-select',
      key: 'Emissary-01hq0z29zf43a07gp29p98qmwk',
      value: '',
      validation: [],
      label: '',
      placeholder: 'Emissary-01hq0z29zf43a07gp29p98qmwk',
      description: '',
      props: {
        isMultipleTag: true,
        options: [
          {
            id: 'emissary-user',
            label: 'emissary-user',
            value: 'emissary-user',
          },
        ],
      },
      formControl: {
        _pendingDirty: false,
        _hasOwnPendingAsyncValidator: false,
        _pendingTouched: false,
        _parent: null,
        pristine: true,
        touched: false,
        _onDisabledChange: [],
        _rawValidators: [],
        _composedValidatorFn: null,
        _rawAsyncValidators: null,
        _composedAsyncValidatorFn: null,
        defaultValue: null,
        _onChange: [],
        _pendingChange: false,
        _pendingValue: '',
        value: '',
        valueChanges: {
          closed: false,
          currentObservers: null,
          observers: [],
          isStopped: false,
          hasError: false,
          thrownError: null,
          __isAsync: false,
        },
        statusChanges: {
          closed: false,
          currentObservers: null,
          observers: [],
          isStopped: false,
          hasError: false,
          thrownError: null,
          __isAsync: false,
        },
        status: 'VALID',
        errors: null,
      },
    },
  },
  {
    id: 'Envoy-Tools',
    roles: {
      id: 'field_19',
      type: 'custom-select',
      key: 'Envoy-Tools',
      value: '',
      validation: [],
      label: '',
      placeholder: 'Envoy-Tools',
      description: '',
      props: {
        isMultipleTag: true,
        options: [],
      },
      formControl: {
        _pendingDirty: false,
        _hasOwnPendingAsyncValidator: false,
        _pendingTouched: false,
        _parent: null,
        pristine: true,
        touched: false,
        _onDisabledChange: [],
        _rawValidators: [],
        _composedValidatorFn: null,
        _rawAsyncValidators: null,
        _composedAsyncValidatorFn: null,
        defaultValue: null,
        _onChange: [],
        _pendingChange: false,
        _pendingValue: '',
        value: '',
        valueChanges: {
          closed: false,
          currentObservers: null,
          observers: [],
          isStopped: false,
          hasError: false,
          thrownError: null,
          __isAsync: false,
        },
        statusChanges: {
          closed: false,
          currentObservers: null,
          observers: [],
          isStopped: false,
          hasError: false,
          thrownError: null,
          __isAsync: false,
        },
        status: 'VALID',
        errors: null,
      },
    },
  },
  {
    id: 'Semantic-01hqty3tfcxx1355mee2d6ra2m',
    roles: {
      id: 'field_20',
      type: 'custom-select',
      key: 'Semantic-01hqty3tfcxx1355mee2d6ra2m',
      value: '',
      validation: [],
      label: '',
      placeholder: 'Semantic-01hqty3tfcxx1355mee2d6ra2m',
      description: '',
      props: {
        isMultipleTag: true,
        options: [
          {
            id: 'semantic-user',
            label: 'semantic-user',
            value: 'semantic-user',
          },
        ],
      },
      formControl: {
        _pendingDirty: false,
        _hasOwnPendingAsyncValidator: false,
        _pendingTouched: false,
        _parent: null,
        pristine: true,
        touched: false,
        _onDisabledChange: [],
        _rawValidators: [],
        _composedValidatorFn: null,
        _rawAsyncValidators: null,
        _composedAsyncValidatorFn: null,
        defaultValue: null,
        _onChange: [],
        _pendingChange: false,
        _pendingValue: '',
        value: '',
        valueChanges: {
          closed: false,
          currentObservers: null,
          observers: [],
          isStopped: false,
          hasError: false,
          thrownError: null,
          __isAsync: false,
        },
        statusChanges: {
          closed: false,
          currentObservers: null,
          observers: [],
          isStopped: false,
          hasError: false,
          thrownError: null,
          __isAsync: false,
        },
        status: 'VALID',
        errors: null,
      },
    },
  },
  {
    id: 'atlas-frontend',
    roles: {
      id: 'field_21',
      type: 'custom-select',
      key: 'atlas-frontend',
      value: '',
      validation: [],
      label: '',
      placeholder: 'atlas-frontend',
      description: '',
      props: {
        isMultipleTag: true,
        options: [
          {
            id: 'access',
            label: 'access',
            value: 'access',
          },
        ],
      },
      formControl: {
        _pendingDirty: false,
        _hasOwnPendingAsyncValidator: false,
        _pendingTouched: false,
        _parent: null,
        pristine: true,
        touched: false,
        _onDisabledChange: [],
        _rawValidators: [],
        _composedValidatorFn: null,
        _rawAsyncValidators: null,
        _composedAsyncValidatorFn: null,
        defaultValue: null,
        _onChange: [],
        _pendingChange: false,
        _pendingValue: '',
        value: '',
        valueChanges: {
          closed: false,
          currentObservers: null,
          observers: [],
          isStopped: false,
          hasError: false,
          thrownError: null,
          __isAsync: false,
        },
        statusChanges: {
          closed: false,
          currentObservers: null,
          observers: [],
          isStopped: false,
          hasError: false,
          thrownError: null,
          __isAsync: false,
        },
        status: 'VALID',
        errors: null,
      },
    },
  },
  {
    id: 'atlas-portal',
    roles: {
      id: 'field_22',
      type: 'custom-select',
      key: 'atlas-portal',
      value: '',
      validation: [],
      label: '',
      placeholder: 'atlas-portal',
      description: '',
      props: {
        isMultipleTag: true,
        options: [],
      },
      formControl: {
        _pendingDirty: false,
        _hasOwnPendingAsyncValidator: false,
        _pendingTouched: false,
        _parent: null,
        pristine: true,
        touched: false,
        _onDisabledChange: [],
        _rawValidators: [],
        _composedValidatorFn: null,
        _rawAsyncValidators: null,
        _composedAsyncValidatorFn: null,
        defaultValue: null,
        _onChange: [],
        _pendingChange: false,
        _pendingValue: '',
        value: '',
        valueChanges: {
          closed: false,
          currentObservers: null,
          observers: [],
          isStopped: false,
          hasError: false,
          thrownError: null,
          __isAsync: false,
        },
        statusChanges: {
          closed: false,
          currentObservers: null,
          observers: [],
          isStopped: false,
          hasError: false,
          thrownError: null,
          __isAsync: false,
        },
        status: 'VALID',
        errors: null,
      },
    },
  },
  {
    id: 'Emissary-01hh4tbrxtkn3gn06dgwmqagyy',
    roles: {
      id: 'field_23',
      type: 'custom-select',
      key: 'Emissary-01hh4tbrxtkn3gn06dgwmqagyy',
      value: '',
      validation: [],
      label: '',
      placeholder: 'Emissary-01hh4tbrxtkn3gn06dgwmqagyy',
      description: '',
      props: {
        isMultipleTag: true,
        options: [
          {
            id: 'emissary-user',
            label: 'emissary-user',
            value: 'emissary-user',
          },
        ],
      },
      formControl: {
        _pendingDirty: false,
        _hasOwnPendingAsyncValidator: false,
        _pendingTouched: false,
        _parent: null,
        pristine: true,
        touched: false,
        _onDisabledChange: [],
        _rawValidators: [],
        _composedValidatorFn: null,
        _rawAsyncValidators: null,
        _composedAsyncValidatorFn: null,
        defaultValue: null,
        _onChange: [],
        _pendingChange: false,
        _pendingValue: '',
        value: '',
        valueChanges: {
          closed: false,
          currentObservers: null,
          observers: [],
          isStopped: false,
          hasError: false,
          thrownError: null,
          __isAsync: false,
        },
        statusChanges: {
          closed: false,
          currentObservers: null,
          observers: [],
          isStopped: false,
          hasError: false,
          thrownError: null,
          __isAsync: false,
        },
        status: 'VALID',
        errors: null,
      },
    },
  },
];

const mockDataTwo = [
  {
    name: 'John Michael',
    job: 'Manager So I started to walk into the water. I wont lie to you, I was terrified. But I pressed on, and as I made my way past the breakers, the water became calmer and calmer.',
    date: '23/04/10',
  },
  {
    name: 'Alexa Johnson',
    job: 'CEO',
    date: '23/04/02',
  },
  {
    name: 'Sierra Brooks',
    job: 'Designer',
    date: '23/04/05',
  },
  {
    name: 'Thomas Smith',
    job: 'Developer',
    date: '23/04/05',
  },
  {
    name: 'Jenna Kian',
    job: 'Marketing',
    date: '23/04/18',
  },
  {
    name: 'Denzel Washington',
    job: 'Actor',
    date: '23/04/05',
  },
  {
    name: 'Morgan Freeman',
    job: 'Actor',
    date: '23/04/05',
  },
];

const mockDataThree = [
  {
    userName: 'rcp-admin',
    displayName: 'RCP Admin',
    email: 'andy.scott@rhapsod.health',
    userZid: '236954760123521326',
    orgZid: 'rhapsody-health',
    state: 'USER_STATE_ACTIVE',
    type: 'HUMAN',
    grants: [
      {
        serviceId: 'envoy-tools-standalone',
        projectZid: '265481886246122980',
        grantZid: '266080360360588772',
        grantedRoles: ['user'],
      },
      {
        serviceId: 'atlas-chronicle',
        projectZid: '265252074105681380',
        grantZid: '272322138134820324',
        grantedRoles: ['admin'],
      },
      {
        serviceId: 'semantic-dashboard',
        projectZid: '265511721454613988',
        grantZid: '268509787019294180',
        grantedRoles: ['access'],
      },
      {
        serviceId: 'atlas-deploy',
        projectZid: '265227730885359076',
        grantZid: '272322064684168676',
        grantedRoles: ['admin'],
      },
      {
        serviceId: 'atlas-iam',
        projectZid: '265237192228484580',
        grantZid: '272322111089948132',
        grantedRoles: ['admin'],
      },
      {
        serviceId: 'Atlas',
        projectZid: '236954744067725614',
        grantZid: '238553850921883923',
        grantedRoles: ['instance-admin', 'manifest-admin', 'registry-admin'],
      },
    ],
    createdTs: 1697732044000,
    updateTs: 1707472157000,
  },
  {
    userName: 'josh.varner',
    displayName: 'Josh Varner',
    email: 'josh.varner@rhapsody.health',
    userZid: '252025051245713683',
    orgZid: 'rhapsody-health',
    state: 'USER_STATE_ACTIVE',
    type: 'HUMAN',
    grants: [
      {
        serviceId: 'Atlas',
        projectZid: '236954744067725614',
        grantZid: '253329726616115475',
        grantedRoles: null,
      },
    ],
    createdTs: 1706714637000,
    updateTs: 1706714637000,
  },
  {
    userName: 'christopher.stehno',
    displayName: 'Christopher Stehno',
    email: 'christopher.stehno@rhapsody.health',
    userZid: '259871968390551864',
    orgZid: 'rhapsody-health',
    state: 'USER_STATE_ACTIVE',
    type: 'HUMAN',
    grants: [
      {
        serviceId: 'Atlas',
        projectZid: '236954744067725614',
        grantZid: '259991201497749816',
        grantedRoles: ['instance-reader', 'manifest-reader', 'registry-reader'],
      },
    ],
    createdTs: 1711391764000,
    updateTs: 1711391764000,
  },
  {
    userName: 'thomas.myers@rhapsody.health',
    displayName: 'Thomas Myers',
    email: 'thomas.myers@rhapsody.health',
    userZid: '260870799425018168',
    orgZid: 'rhapsody-health',
    state: 'USER_STATE_INITIAL',
    type: 'HUMAN',
    grants: [],
    createdTs: 1711987114000,
    updateTs: 1711987114000,
  },
  {
    userName: 'john.smith',
    displayName: 'John Smith',
    email: 'john.smith@rhapsody.health',
    userZid: '264397833866589668',
    orgZid: 'rhapsody-health',
    state: 'USER_STATE_ACTIVE',
    type: 'HUMAN',
    grants: [],
    createdTs: 1714089390000,
    updateTs: 1714089390000,
  },
  {
    userName: 'john.smith2',
    displayName: 'John2 Smith2',
    email: 'john.smith2@rhapsody.health',
    userZid: '265078698942674404',
    orgZid: 'rhapsody-health',
    state: 'USER_STATE_ACTIVE',
    type: 'HUMAN',
    grants: [],
    createdTs: 1714495217000,
    updateTs: 1714495217000,
  },
  {
    userName: 'sam.jakos',
    displayName: 'Sam Jakos',
    email: 'sam.jakos@rhapsody.health',
    userZid: '266073095641511396',
    orgZid: 'rhapsody-health',
    state: 'USER_STATE_ACTIVE',
    type: 'HUMAN',
    grants: [
      {
        serviceId: 'envoy-tools-standalone',
        projectZid: '265481886246122980',
        grantZid: '266073675495716324',
        grantedRoles: ['user'],
      },
    ],
    createdTs: 1715087923000,
    updateTs: 1715088790000,
  },
  {
    userName: 'john.smith3',
    displayName: 'John2 Smith2',
    email: 'john.smith3@rhapsody.health',
    userZid: '272285369322452452',
    orgZid: 'rhapsody-health',
    state: 'USER_STATE_ACTIVE',
    type: 'HUMAN',
    grants: [
      {
        serviceId: 'atlas-deploy',
        projectZid: '265227730885359076',
        grantZid: '272285378919020004',
        grantedRoles: ['registry:read', 'manifests:read'],
      },
      {
        serviceId: 'atlas-iam',
        projectZid: '265237192228484580',
        grantZid: '272285382895220196',
        grantedRoles: ['orgs:read', 'users:write', 'users:read'],
      },
    ],
    createdTs: 1718790728000,
    updateTs: 1718790728000,
  },
  {
    userName: 'john.smith4',
    displayName: 'John4 Smith4',
    email: 'john.smith4@rhapsody.health',
    userZid: '272285759862486500',
    orgZid: 'rhapsody-health',
    state: 'USER_STATE_ACTIVE',
    type: 'HUMAN',
    grants: [
      {
        serviceId: 'atlas-deploy',
        projectZid: '265227730885359076',
        grantZid: '272285783384339940',
        grantedRoles: ['registry:read', 'manifests:read'],
      },
      {
        serviceId: 'atlas-iam',
        projectZid: '265237192228484580',
        grantZid: '272285788132095460',
        grantedRoles: ['orgs:read', 'users:write', 'users:read'],
      },
    ],
    createdTs: 1718790961000,
    updateTs: 1718790961000,
  },
  {
    userName: 'melissa',
    displayName: 'melissa langhausen',
    email: 'melissa.langhausen@rhapsody.health',
    userZid: '272285849167607268',
    orgZid: 'rhapsody-health',
    state: 'USER_STATE_ACTIVE',
    type: 'HUMAN',
    grants: [
      {
        serviceId: 'atlas-deploy',
        projectZid: '265227730885359076',
        grantZid: '272285859603035620',
        grantedRoles: ['registry:read', 'manifests:read'],
      },
      {
        serviceId: 'atlas-iam',
        projectZid: '265237192228484580',
        grantZid: '272285863025587684',
        grantedRoles: ['orgs:read', 'users:write', 'users:read'],
      },
    ],
    createdTs: 1718791014000,
    updateTs: 1718791014000,
  },
  {
    userName: 'melissa.langhausen@rhapsody.health',
    displayName: 'melissa langhausen',
    email: 'melissa.langhausen@rhapsody.health',
    userZid: '272285890724836836',
    orgZid: 'rhapsody-health',
    state: 'USER_STATE_ACTIVE',
    type: 'HUMAN',
    grants: [
      {
        serviceId: 'atlas-deploy',
        projectZid: '265227730885359076',
        grantZid: '272285901931951588',
        grantedRoles: ['registry:read', 'manifests:read'],
      },
      {
        serviceId: 'atlas-iam',
        projectZid: '265237192228484580',
        grantZid: '272285905354569188',
        grantedRoles: ['orgs:read', 'users:write', 'users:read'],
      },
    ],
    createdTs: 1718791039000,
    updateTs: 1718791039000,
  },
  {
    userName: 'quintonn.rothmann@lyniate.com',
    displayName: 'Quintonn Rothmann',
    email: 'quintonn.rothmann@rhapsody.health',
    userZid: '274165832152528356',
    orgZid: 'rhapsody-health',
    state: 'USER_STATE_ACTIVE',
    type: 'HUMAN',
    grants: [],
    createdTs: 1719911570000,
    updateTs: 1719911570000,
  },
  {
    userName: 'craig.simmons.rhapsody-health',
    displayName: 'Craig Simmons',
    email: 'craig.simmons@rhapsody.health',
    userZid: '275216233043867126',
    orgZid: 'rhapsody-health',
    state: 'USER_STATE_ACTIVE',
    type: 'HUMAN',
    grants: [],
    createdTs: 1720537659000,
    updateTs: 1720537659000,
  },
  {
    userName: 'frazer.chan@lyniate.com',
    displayName: 'Frazer Chan',
    email: 'frazer.chan@rhapsody.health',
    userZid: '277210277609504588',
    orgZid: 'rhapsody-health',
    state: 'USER_STATE_ACTIVE',
    type: 'HUMAN',
    grants: [],
    createdTs: 1721726201000,
    updateTs: 1721726201000,
  },
];

import { Meta, StoryObj, componentWrapperDecorator, moduleMetadata } from '@storybook/angular';
import { userEvent, within } from '@storybook/testing-library';

import { ReactiveFormsModule } from '@angular/forms';
import { TableBuilder } from '../utils/table-builder';
import { TableComponent } from '../table.component';
import { action } from '@storybook/addon-actions';

const meta: Meta<TableComponent> = {
  title: 'TailwindUI/Components/Tables/Table',
  component: TableComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    moduleMetadata({
      imports: [TableComponent, ReactiveFormsModule],
    }),
    componentWrapperDecorator(
      (story) => `<div style="margin: 3em; display: flex; justify-content: center; align-items: center">
        ${story}
      </div>`
    ),
  ],
  argTypes: {
    config: { control: 'object' },
  },
};

export default meta;
type Story = StoryObj<TableComponent>;

export const TableWithAllSettings: Story = {
  args: {
    config: new TableBuilder()
      .setIsWrapped(false)
      .setData(mockDataTwo)
      .setColumns(['name', 'job', 'date'])
      .setIsDraggable(true)
      .setIsSelectable(true)
      .setIsSortable(true)
      .setIsSearchable(true)
      .setIsActionButton(true)
      .setActionButtons([
        {
          icon: 'visibility',
          label: 'View',
          color: 'primary',
          onClick: action('View clicked'),
        },
        {
          icon: 'edit',
          label: 'Edit',
          color: 'primary',
          onClick: action('Edit clicked'),
        },
        {
          icon: 'delete',
          label: 'Delete',
          color: 'danger',
          onClick: action('Delete clicked'),
        },
      ])
      .build(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const row = canvas.getByText('John Michael');
    await userEvent.click(row);
  },
};

export const TableWithAllSettingsAndWrapped: Story = {
  args: {
    config: new TableBuilder()
      .setIsWrapped(true)
      .setData(mockDataTwo)
      .setColumns(['name', 'job', 'date'])
      .setIsDraggable(true)
      .setIsSelectable(true)
      .setIsSortable(true)
      .setIsSearchable(true)
      .setIsActionButton(true)
      .setActionButtons([
        {
          icon: 'visibility',
          label: 'View',
          color: 'primary',
          onClick: action('View clicked'),
        },
        {
          icon: 'edit',
          label: 'Edit',
          color: 'primary',
          onClick: action('Edit clicked'),
        },
        {
          icon: 'delete',
          label: 'Delete',
          color: 'danger',
          onClick: action('Delete clicked'),
        },
      ])
      .setTableHeader({
        title: 'Table Header',
        subtitle: 'Table Subtitle',
        isSearchable: true,
        isPreference: true,
        buttons: [
          {
            label: 'View ALL',
            onClick: action('View All clicked'),
            color: 'primary',
            icon: '',
          },
          { label: 'add member', onClick: action('Add Member clicked'), color: 'primary', icon: 'person_add' },
        ],
      })
      .build(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const row = canvas.getByText('John Michael');
    await userEvent.click(row);
  },
};

export const TableTestingOutput: Story = {
  args: {
    config: new TableBuilder()
      .setIsWrapped(true)
      .setData(mockData)
      .setColumns(['id', 'roles'])
      .setIsDraggable(true)
      .setIsSelectable(true)
      .setIsSortable(true)
      .setIsSearchable(true)
      .setIsActionButton(true)
      .setIsMultiSelectField(true)
      .setTableHeader({
        title: 'Table Header',
        subtitle: 'Table Subtitle',
        isSearchable: true,
        isPreference: false,
      })
      .build(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const row = canvas.getByText('Atlas');
    await userEvent.click(row);
  },
};


function mergeUsers(users: any[]): any[] {
  const createUserList = users.map((user) => ({
    userName: user.userName,
    displayName: user.displayName,
    email: user.email,
    userZid: user.userZid,
    orgZid: user.orgZid,
    state: user.state,
    type: user.type,
    grants: user.grants,
    createdTs: user.createdTs,
    updateTs: user.updateTs,
  }));
  const mergedUsersMap: { [key: string]: any } = {};

  createUserList.forEach((user) => {
    if (!mergedUsersMap[user.userName]) {
      mergedUsersMap[user.userName] = {
        userName: user.userName,
        services: [],
        roles: [],
      };
    }

    user.grants.forEach((grant: any) => {
      if (!mergedUsersMap[user.userName].services.includes(grant.serviceId)) {
        mergedUsersMap[user.userName].services.push(grant.serviceId);
      }
      if (grant.grantedRoles) {
        grant.grantedRoles.forEach((role: any) => {
          if (!mergedUsersMap[user.userName].roles.includes(role)) {
            mergedUsersMap[user.userName].roles.push(role);
          }
        });
      }
    });
  });

  return Object.values(mergedUsersMap);
}


export const TableAppUsagegOutput: Story = {
  args: {
    config: new TableBuilder()
      .setIsWrapped(true)
      .setData(mergeUsers(mockDataThree))
      .setColumns(['userName', 'roles', 'services'])
      .setIsDraggable(true)
      .setIsSelectable(true)
      .setIsSortable(true)
      .build(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const row = canvas.getByText('Atlas');
    await userEvent.click(row);
  },
};
