// Mock In-Memory Storage for Demo Mode
let users = [];
let portfolios = [];

const MockStorage = {
  users: {
    find: async (query) => users.filter(u => Object.keys(query).every(k => u[k] === query[k])),
    findById: function(id) {
        return {
            select: async function(fields) {
                const u = users.find(user => user._id === id);
                if (!u) return null;
                const res = { ...u };
                if (fields === '-password') delete res.password;
                return res;
            }
        };
    },
    findOne: async (query) => {
      const user = users.find(u => Object.keys(query).every(k => u[k] === query[k]));
      if (user) {
        if (!user.matchPassword) {
          user.matchPassword = async function(pass) {
            const bcrypt = require('bcryptjs');
            return await bcrypt.compare(pass, this.password);
          };
        }
        if (!user.save) {
          user.save = async function() {
            const idx = users.findIndex(u => u._id === this._id);
            if (idx !== -1) users[idx] = this;
            return this;
          };
        }
      }
      return user;
    },
    create: async (data) => {
      const bcrypt = require('bcryptjs');
      const hashedPassword = await bcrypt.hash(data.password, 10);
      const newUser = { 
        ...data, 
        password: hashedPassword,
        _id: Date.now().toString(), 
        credits: data.credits || 3, 
        referralCode: 'MOCK' + Math.random().toString(36).substr(2, 5).toUpperCase(),
        matchPassword: async function(pass) {
          return await bcrypt.compare(pass, this.password);
        },
        save: async function() {
          const idx = users.findIndex(u => u._id === this._id);
          if (idx !== -1) users[idx] = this;
          return this;
        }
      };
      users.push(newUser);
      return newUser;
    },
    save: async (user) => {
        const idx = users.findIndex(u => u._id === user._id);
        if (idx !== -1) users[idx] = user;
        return user;
    }
  },
  portfolios: {
    find: async (query) => portfolios.filter(p => Object.keys(query).every(k => p[k] === query[k])),
    findOne: async (query) => portfolios.find(p => Object.keys(query).every(k => p[k] === query[k])),
    create: async (data) => {
      const newPortfolio = { ...data, _id: Date.now().toString(), createdAt: new Date() };
      portfolios.push(newPortfolio);
      return newPortfolio;
    },
    findOneAndUpdate: async (query, update) => {
        const idx = portfolios.findIndex(p => Object.keys(query).every(k => p[k] === query[k]));
        if (idx !== -1) {
            portfolios[idx] = { ...portfolios[idx], ...update };
            return portfolios[idx];
        }
        return null;
    },
    findOneAndDelete: async (query) => {
        const idx = portfolios.findIndex(p => Object.keys(query).every(k => p[k] === query[k]));
        if (idx !== -1) {
            const deleted = portfolios.splice(idx, 1)[0];
            return deleted;
        }
        return null;
    }
  }
};

module.exports = MockStorage;
