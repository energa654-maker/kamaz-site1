const fs = require('fs/promises');
const path = require('path');

const dataDir = path.join(__dirname, 'data');
const leadsFile = path.join(dataDir, 'leads.json');

async function readJson(file, fallback) {
  try {
    const raw = await fs.readFile(file, 'utf8');
    return JSON.parse(raw);
  } catch (error) {
    return fallback;
  }
}

async function writeJson(file, value) {
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, JSON.stringify(value, null, 2), 'utf8');
}

async function getLeads() {
  const leads = await readJson(leadsFile, []);
  return leads.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
}

async function createLead({ name, phone, comment }) {
  const leads = await readJson(leadsFile, []);
  const nextId = leads.reduce((max, lead) => Math.max(max, Number(lead.id) || 0), 0) + 1;
  const lead = {
    id: nextId,
    name,
    phone,
    comment: comment || '',
    status: 'new',
    created_at: new Date().toISOString()
  };

  leads.push(lead);
  await writeJson(leadsFile, leads);
  return lead;
}

async function updateLeadStatus(id, status) {
  const leads = await readJson(leadsFile, []);
  const lead = leads.find(item => Number(item.id) === Number(id));
  if (lead) {
    lead.status = status;
  }
  await writeJson(leadsFile, leads);
  return lead || null;
}

async function deleteLead(id) {
  const leads = await readJson(leadsFile, []);
  const next = leads.filter(item => Number(item.id) !== Number(id));
  await writeJson(leadsFile, next);
}

module.exports = {
  getLeads,
  createLead,
  updateLeadStatus,
  deleteLead
};
