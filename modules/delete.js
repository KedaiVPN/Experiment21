
const axios = require('axios');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./sellvpn.db');

async function deletessh(username, serverId) {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM Server WHERE id = ?', [serverId], (err, server) => {
      if (err) {
        console.error('Error fetching server:', err.message);
        return resolve('❌ Server tidak ditemukan. Silakan coba lagi.');
      }

      if (!server) return resolve('❌ Server tidak ditemukan. Silakan coba lagi.');

      const domain = server.domain;
      const auth = server.auth;
      const param = `:5888/deletessh?user=${username}&auth=${auth}`;
      const url = `http://${domain}${param}`;
      
      axios.get(url)
        .then(response => {
          if (response.data.status === "success") {
            return resolve(`✅ Akun SSH ${username} berhasil dihapus.`);
          } else {
            return resolve(`❌ Terjadi kesalahan: ${response.data.message}`);
          }
        })
        .catch(error => {
          console.error('Error saat menghapus SSH:', error);
          return resolve('❌ Terjadi kesalahan saat menghapus SSH. Silakan coba lagi nanti.');
        });
    });
  });
}

async function deletevmess(username, serverId) {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM Server WHERE id = ?', [serverId], (err, server) => {
      if (err) {
        console.error('Error fetching server:', err.message);
        return resolve('❌ Server tidak ditemukan. Silakan coba lagi.');
      }

      if (!server) return resolve('❌ Server tidak ditemukan. Silakan coba lagi.');

      const domain = server.domain;
      const auth = server.auth;
      const param = `:5888/deletevmess?user=${username}&auth=${auth}`;
      const url = `http://${domain}${param}`;
      
      axios.get(url)
        .then(response => {
          if (response.data.status === "success") {
            return resolve(`✅ Akun VMess ${username} berhasil dihapus.`);
          } else {
            return resolve(`❌ Terjadi kesalahan: ${response.data.message}`);
          }
        })
        .catch(error => {
          console.error('Error saat menghapus VMess:', error);
          return resolve('❌ Terjadi kesalahan saat menghapus VMess. Silakan coba lagi nanti.');
        });
    });
  });
}

async function deletevless(username, serverId) {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM Server WHERE id = ?', [serverId], (err, server) => {
      if (err) {
        console.error('Error fetching server:', err.message);
        return resolve('❌ Server tidak ditemukan. Silakan coba lagi.');
      }

      if (!server) return resolve('❌ Server tidak ditemukan. Silakan coba lagi.');

      const domain = server.domain;
      const auth = server.auth;
      const param = `:5888/deletevless?user=${username}&auth=${auth}`;
      const url = `http://${domain}${param}`;
      
      axios.get(url)
        .then(response => {
          if (response.data.status === "success") {
            return resolve(`✅ Akun VLess ${username} berhasil dihapus.`);
          } else {
            return resolve(`❌ Terjadi kesalahan: ${response.data.message}`);
          }
        })
        .catch(error => {
          console.error('Error saat menghapus VLess:', error);
          return resolve('❌ Terjadi kesalahan saat menghapus VLess. Silakan coba lagi nanti.');
        });
    });
  });
}

async function deletetrojan(username, serverId) {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM Server WHERE id = ?', [serverId], (err, server) => {
      if (err) {
        console.error('Error fetching server:', err.message);
        return resolve('❌ Server tidak ditemukan. Silakan coba lagi.');
      }

      if (!server) return resolve('❌ Server tidak ditemukan. Silakan coba lagi.');

      const domain = server.domain;
      const auth = server.auth;
      const param = `:5888/deletetrojan?user=${username}&auth=${auth}`;
      const url = `http://${domain}${param}`;
      
      axios.get(url)
        .then(response => {
          if (response.data.status === "success") {
            return resolve(`✅ Akun Trojan ${username} berhasil dihapus.`);
          } else {
            return resolve(`❌ Terjadi kesalahan: ${response.data.message}`);
          }
        })
        .catch(error => {
          console.error('Error saat menghapus Trojan:', error);
          return resolve('❌ Terjadi kesalahan saat menghapus Trojan. Silakan coba lagi nanti.');
        });
    });
  });
}

async function deleteshadowsocks(username, serverId) {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM Server WHERE id = ?', [serverId], (err, server) => {
      if (err) {
        console.error('Error fetching server:', err.message);
        return resolve('❌ Server tidak ditemukan. Silakan coba lagi.');
      }

      if (!server) return resolve('❌ Server tidak ditemukan. Silakan coba lagi.');

      const domain = server.domain;
      const auth = server.auth;
      const param = `:5888/deleteshadowsocks?user=${username}&auth=${auth}`;
      const url = `http://${domain}${param}`;
      
      axios.get(url)
        .then(response => {
          if (response.data.status === "success") {
            return resolve(`✅ Akun Shadowsocks ${username} berhasil dihapus.`);
          } else {
            return resolve(`❌ Terjadi kesalahan: ${response.data.message}`);
          }
        })
        .catch(error => {
          console.error('Error saat menghapus Shadowsocks:', error);
          return resolve('❌ Terjadi kesalahan saat menghapus Shadowsocks. Silakan coba lagi nanti.');
        });
    });
  });
}

module.exports = { deletessh, deletevmess, deletevless, deletetrojan, deleteshadowsocks };
