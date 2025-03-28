
const axios = require('axios');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./sellvpn.db');

async function getAccountExpiry(username, type, domain, auth) {
  try {
    const url = `http://${domain}:5888/check${type}?user=${username}&auth=${auth}`;
    const response = await axios.get(url);
    if (response.data.status === "success") {
      return response.data.data.expired;
    }
    return null;
  } catch (error) {
    console.error(`Error checking expiry for ${type}:`, error);
    return null;
  }
}

async function calculateRefund(expiry, userId, serverId) {
  return new Promise((resolve, reject) => {
    if (!expiry) return resolve(0);

    db.get('SELECT harga FROM Server WHERE id = ?', [serverId], (err, server) => {
      if (err || !server) return resolve(0);

      const now = new Date();
      const expiryDate = new Date(expiry);
      const diffTime = Math.abs(expiryDate - now);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const refundAmount = diffDays * server.harga;

      // Update saldo user
      db.run('UPDATE users SET saldo = saldo + ? WHERE user_id = ?', [refundAmount, userId], (err) => {
        if (err) {
          console.error('Error updating user saldo:', err);
          resolve(0);
        } else {
          resolve(refundAmount);
        }
      });
    });
  });
}

async function deletessh(username, serverId, userId) {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM Server WHERE id = ?', [serverId], async (err, server) => {
      if (err || !server) return resolve('❌ Server tidak ditemukan. Silakan coba lagi.');

      const expiry = await getAccountExpiry(username, 'ssh', server.domain, server.auth);
      const refundAmount = await calculateRefund(expiry, userId, serverId);

      const param = `:5888/deletessh?user=${username}&auth=${server.auth}`;
      const url = `http://${server.domain}${param}`;
      
      try {
        const response = await axios.get(url);
        if (response.data.status === "success") {
          return resolve(`✅ Akun SSH ${username} berhasil dihapus.\n💰 Refund: Rp${refundAmount}`);
        } else {
          return resolve(`❌ Terjadi kesalahan: ${response.data.message}`);
        }
      } catch (error) {
        console.error('Error saat menghapus SSH:', error);
        return resolve('❌ Terjadi kesalahan saat menghapus SSH. Silakan coba lagi nanti.');
      }
    });
  });
}

async function deletevmess(username, serverId, userId) {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM Server WHERE id = ?', [serverId], async (err, server) => {
      if (err || !server) return resolve('❌ Server tidak ditemukan. Silakan coba lagi.');

      const expiry = await getAccountExpiry(username, 'vmess', server.domain, server.auth);
      const refundAmount = await calculateRefund(expiry, userId, serverId);

      const param = `:5888/deletevmess?user=${username}&auth=${server.auth}`;
      const url = `http://${server.domain}${param}`;
      
      try {
        const response = await axios.get(url);
        if (response.data.status === "success") {
          return resolve(`✅ Akun VMess ${username} berhasil dihapus.\n💰 Refund: Rp${refundAmount}`);
        } else {
          return resolve(`❌ Terjadi kesalahan: ${response.data.message}`);
        }
      } catch (error) {
        console.error('Error saat menghapus VMess:', error);
        return resolve('❌ Terjadi kesalahan saat menghapus VMess. Silakan coba lagi nanti.');
      }
    });
  });
}

async function deletevless(username, serverId, userId) {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM Server WHERE id = ?', [serverId], async (err, server) => {
      if (err || !server) return resolve('❌ Server tidak ditemukan. Silakan coba lagi.');

      const expiry = await getAccountExpiry(username, 'vless', server.domain, server.auth);
      const refundAmount = await calculateRefund(expiry, userId, serverId);

      const param = `:5888/deletevless?user=${username}&auth=${server.auth}`;
      const url = `http://${server.domain}${param}`;
      
      try {
        const response = await axios.get(url);
        if (response.data.status === "success") {
          return resolve(`✅ Akun VLess ${username} berhasil dihapus.\n💰 Refund: Rp${refundAmount}`);
        } else {
          return resolve(`❌ Terjadi kesalahan: ${response.data.message}`);
        }
      } catch (error) {
        console.error('Error saat menghapus VLess:', error);
        return resolve('❌ Terjadi kesalahan saat menghapus VLess. Silakan coba lagi nanti.');
      }
    });
  });
}

async function deletetrojan(username, serverId, userId) {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM Server WHERE id = ?', [serverId], async (err, server) => {
      if (err || !server) return resolve('❌ Server tidak ditemukan. Silakan coba lagi.');

      const expiry = await getAccountExpiry(username, 'trojan', server.domain, server.auth);
      const refundAmount = await calculateRefund(expiry, userId, serverId);

      const param = `:5888/deletetrojan?user=${username}&auth=${server.auth}`;
      const url = `http://${server.domain}${param}`;
      
      try {
        const response = await axios.get(url);
        if (response.data.status === "success") {
          return resolve(`✅ Akun Trojan ${username} berhasil dihapus.\n💰 Refund: Rp${refundAmount}`);
        } else {
          return resolve(`❌ Terjadi kesalahan: ${response.data.message}`);
        }
      } catch (error) {
        console.error('Error saat menghapus Trojan:', error);
        return resolve('❌ Terjadi kesalahan saat menghapus Trojan. Silakan coba lagi nanti.');
      }
    });
  });
}

async function deleteshadowsocks(username, serverId, userId) {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM Server WHERE id = ?', [serverId], async (err, server) => {
      if (err || !server) return resolve('❌ Server tidak ditemukan. Silakan coba lagi.');

      const expiry = await getAccountExpiry(username, 'shadowsocks', server.domain, server.auth);
      const refundAmount = await calculateRefund(expiry, userId, serverId);

      const param = `:5888/deleteshadowsocks?user=${username}&auth=${server.auth}`;
      const url = `http://${server.domain}${param}`;
      
      try {
        const response = await axios.get(url);
        if (response.data.status === "success") {
          return resolve(`✅ Akun Shadowsocks ${username} berhasil dihapus.\n💰 Refund: Rp${refundAmount}`);
        } else {
          return resolve(`❌ Terjadi kesalahan: ${response.data.message}`);
        }
      } catch (error) {
        console.error('Error saat menghapus Shadowsocks:', error);
        return resolve('❌ Terjadi kesalahan saat menghapus Shadowsocks. Silakan coba lagi nanti.');
      }
    });
  });
}

module.exports = { deletessh, deletevmess, deletevless, deletetrojan, deleteshadowsocks };
