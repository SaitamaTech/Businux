import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Mock customer storage
const customers = [];

/**
 * GET /api/crm/customers
 * List all customers
 */
router.get('/customers', (req, res) => {
  res.json({ customers });
});

/**
 * GET /api/crm/customers/:id
 * Get a specific customer
 */
router.get('/customers/:id', (req, res) => {
  const customer = customers.find(c => c.id === req.params.id);
  if (!customer) {
    return res.status(404).json({ error: { message: 'Customer not found' } });
  }
  res.json({ customer });
});

/**
 * POST /api/crm/customers
 * Create a new customer
 */
router.post('/customers', (req, res) => {
  const { name, email, phone, industry, status } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: { message: 'Name and email required' } });
  }

  const customer = {
    id: `c-${uuidv4()}`,
    name,
    email,
    phone: phone || '',
    industry: industry || 'Not specified',
    status: status || 'Lead',
    type: 'Company',
    address: '',
    tags: [],
    totalDeals: 0,
    totalValue: 0,
    wonDeals: 0,
    lastContact: new Date().toISOString().split('T')[0],
    customerSince: new Date().toISOString().split('T')[0],
  };

  customers.push(customer);
  res.status(201).json({ customer });
});

/**
 * PUT /api/crm/customers/:id
 * Update a customer
 */
router.put('/customers/:id', (req, res) => {
  const customer = customers.find(c => c.id === req.params.id);
  if (!customer) {
    return res.status(404).json({ error: { message: 'Customer not found' } });
  }

  Object.assign(customer, req.body);
  res.json({ customer });
});

/**
 * DELETE /api/crm/customers/:id
 * Delete a customer
 */
router.delete('/customers/:id', (req, res) => {
  const index = customers.findIndex(c => c.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: { message: 'Customer not found' } });
  }

  const deleted = customers.splice(index, 1);
  res.json({ customer: deleted[0] });
});

export default router;
