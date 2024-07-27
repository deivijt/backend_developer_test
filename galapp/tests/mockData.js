const mockUsers = {
  user1: {
    name: "Pablo Mármol",
    email: "pablo@galapp.co",
    phone: "3103334455",
    accounts: {
      account1: {
        name: "Café",
        role: "role1",
      },
      account2: {
        name: "Cacao",
        role: "role1",
      },
    },
  },
  user2: {
    name: "Vilma Picapiedra",
    email: "vilma@galapp.co",
    phone: "3218889900",
    accounts: {
      account1: {
        name: "Café",
        role: "role2",
      },
    },
  },
  user3: {
    name: "Pedro Picapiedra",
    email: "pedro@galapp.co",
    phone: "3017776655",
    accounts: {
      account2: {
        name: "Cacao",
        role: "role3",
      },
    },
  },
};

const mockAccounts = {
  account1: {
    name: "Café",
    roles: {
      role1: {
        name: "Gerente",
        permissions: {
          form1: {
            create: true,
            read: true,
            update: true,
            delete: true,
          },
          form2: {
            create: true,
            read: true,
            update: true,
            delete: true,
          },
        },
      },
      role2: {
        name: "Administrador finca",
        permissions: {
          form1: {
            create: true,
            read: true,
            update: false,
            delete: false,
          },
          form2: {
            create: true,
            read: true,
            update: false,
            delete: false,
          },
        },
      },
    },
    users: {
      user1: {
        name: "Pablo Mármol",
        role: "role1",
      },
      user2: {
        name: "Vilma Picapiedra",
        role: "role2",
      },
    },
  },
  account2: {
    name: "Cacao",
    roles: {
      role1: {
        name: "Gerente",
        permissions: {
          form1: {
            create: true,
            read: true,
            update: true,
            delete: true,
          },
          form3: {
            create: true,
            read: true,
            update: true,
            delete: true,
          },
        },
      },
      role3: {
        name: "Fermentación",
        permissions: {
          form1: {
            create: false,
            read: true,
            update: false,
            delete: false,
          },
          form3: {
            create: true,
            read: true,
            update: true,
            delete: false,
          },
        },
      },
    },
    users: {
      user1: {
        name: "Pablo Mármol",
        role: "role1",
      },
      user3: {
        name: "Pedro Picapiedra",
        role: "role3",
      },
    },
  },
};

const mockForms = {
  form1: {
    name: "Cosecha",
    fields: [
      { field: "date", label: "Fecha", type: "date" },
      { field: "employee", label: "Trabajador", type: "text" },
      { field: "quantity", label: "Cantidad (Kg)", type: "number" },
    ],
  },
  form2: {
    name: "Secado",
    fields: [
      { field: "date", label: "Fecha", type: "date" },
      { field: "input", label: "Cantidad entrada (Kg)", type: "number" },
      { field: "output", label: "Cantidad salida (Kg)", type: "number" },
    ],
  },
  form3: {
    name: "Fermentación",
    fields: [
      { field: "start_date", label: "Fecha inicio", type: "date" },
      { field: "input", label: "Cantidad entrada (Kg)", type: "number" },
      { field: "end_date", label: "Fecha fin", type: "date" },
      { field: "output", label: "Cantidad salida (Kg)", type: "number" },
    ],
  },
};

const mockFermentations = {
  fermentation1: {
    start_date: "2023-10-01",
    end_date: "2023-10-05",
    input: 300,
    output: 285,
    user_id: "user1",
    account_id: "account2",
  },
  fermentation2: {
    start_date: "2023-10-10",
    end_date: "2023-10-15",
    input: 200,
    output: 190,
    user_id: "user3",
    account_id: "account2",
  },
  fermentation3: {
    start_date: "2023-10-20",
    end_date: "2023-10-25",
    input: 150,
    output: 140,
    user_id: "user1",
    account_id: "account1",
  },
};

const mockDatabaseService = {
  get: jest.fn((entity, id) => {
    switch (entity) {
      case "users":
        return id ? mockUsers[id] : mockUsers;
      case "accounts":
        return id ? mockAccounts[id] : mockAccounts;
      case "forms":
        return id ? mockForms[id] : mockForms;
      case "fermentations":
        return id ? mockFermentations[id] : mockFermentations;
      default:
        return null;
    }
  }),
  post: jest.fn((entity, data) => {
    if (entity === "fermentations") {
      const id = `fermentation${Object.keys(mockFermentations).length + 1}`;
      mockFermentations[id] = data;
      return data;
    }
    return "Record added";
  }),
  put: jest.fn((entity, id, data) => {
    if (entity === "fermentations") {
      mockFermentations[id] = data;

      return data;
    }

    return "Record updated";
  }),
  delete: jest.fn((entity, id) => {
    if (entity === "fermentations") {
      delete mockFermentations[id];

      return "Record deleted";
    }
    return "Record deleted";
  }),
};

module.exports = {
  mockUsers,
  mockAccounts,
  mockForms,
  mockFermentations,
  mockDatabaseService,
};
