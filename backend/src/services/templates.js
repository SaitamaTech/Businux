import { v4 as uuidv4 } from 'uuid';
import { addDocument } from '../db.js';

const TEMPLATES = {
  software: {
    name: 'Software Company',
    docs: [
      { title: 'Company Overview', content: 'We build world-class software products that help businesses scale.' },
      { title: 'Pricing & Packages', content: 'Starter: $49/mo, Pro: $199/mo, Enterprise: contact sales.' },
      { title: 'Employee Handbook', content: 'Code of conduct, PTO, benefits, and policies.' },
    ],
  },
  retail: {
    name: 'Retail',
    docs: [
      { title: 'Store Operations', content: 'Opening hours, inventory, and returns policy.' },
      { title: 'Product Catalog', content: 'Sample product list and SKUs.' },
    ],
  },
};

export function seedTemplate(orgId, templateKey = 'software') {
  const tpl = TEMPLATES[templateKey] || TEMPLATES.software;
  const now = new Date().toISOString();
  const created = [];
  tpl.docs.forEach((d) => {
    const doc = {
      id: uuidv4(),
      org_id: orgId,
      title: d.title,
      content: d.content,
      source: 'template',
      created_at: now,
    };
    addDocument(doc);
    created.push(doc);
  });
  return created;
}

export function listTemplates() {
  return Object.keys(TEMPLATES).map((k) => ({ key: k, name: TEMPLATES[k].name }));
}
