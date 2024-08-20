const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const Role = require('../models/role');
const Permission = require('../models/permission');
const Organization = require('../models/organization');
const { connectDB } = require('../config/database');
const {
  ORG_LIST,
  PERMISSION_LIST,
  ROLE_LIST,
  USER_LIST
} = require('./mockData');

async function seedDatabase() {
  try {
    await connectDB();

    console.log('Clearing existing data...');
    await clearDatabase();

    console.log('Seeding permissions...');
    const permissionIds = await seedPermissions();

    console.log('Seeding roles...');
    const roleIds = await seedRoles(permissionIds);

    console.log('Seeding users...');
    await seedUsers(roleIds);

    console.log('Seeding organizations...');
    await seedOrganizations();

    console.log('Database seeded successfully');
  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    mongoose.connection.close();
  }
}

async function clearDatabase() {
  await Promise.all([
    User.deleteMany({}),
    Role.deleteMany({}),
    Permission.deleteMany({}),
    Organization.deleteMany({})
  ]);
}

async function seedPermissions() {
  const permissionIds = {};

  for (const perm of PERMISSION_LIST) {
    try {
      const createdPerm = await createPermissionWithChildren(perm, null, permissionIds);
      permissionIds[perm.id] = createdPerm._id;
    } catch (err) {
      console.error('Error creating permission:', perm, err);
    }
  }

  return permissionIds;
}

async function createPermissionWithChildren(permission, parentId = null, permissionIds) {
  // Create the permission without children
  const createdPerm = await Permission.create({
    id: permission.id,
    parentId: parentId ? permissionIds[parentId] : null,
    name: permission.name,
    label: permission.label,
    type: permission.type,
    route: permission.route,
    status: permission.status,
    order: permission.order,
    icon: permission.icon,
    component: permission.component,
    hide: permission.hide,
    hideTab: permission.hideTab,
    frameSrc: permission.frameSrc,
    newFeature: permission.newFeature,
  });

  // Store the created permission's `_id`
  permissionIds[permission.id] = createdPerm._id;

  if (permission.children && permission.children.length > 0) {
    const childIds = [];

    for (const childPermission of permission.children) {
      // Recursively create child permissions
      const createdChildPerm = await createPermissionWithChildren(childPermission, permission.id, permissionIds);
      childIds.push(createdChildPerm._id);
    }

    // Update the parent permission with the children ObjectId references
    createdPerm.children = childIds;
    await createdPerm.save();
  }

  return createdPerm;
}

async function seedRoles(permissionIds) {
  const roleIds = {};
  for (const role of ROLE_LIST) {
    try {
      const createdRole = await Role.create({
        id: role.id,
        name: role.name,
        label: role.label,
        status: role.status,
        order: role.order,
        desc: role.desc,
        permission: role.permission.map(p => permissionIds[p.id]),
      });
      roleIds[role.id] = createdRole._id;
    } catch (err) {
      console.error('Error creating role:', role, err);
    }
  }
  return roleIds;
}

async function seedUsers(roleIds) {
  for (const user of USER_LIST) {
    try {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      await User.create({
        ...user,
        password: hashedPassword,
        role: roleIds[user.role.id],
      });
    } catch (err) {
      console.error('Error creating user:', user, err);
    }
  }
}

async function seedOrganizations() {
  const orgMap = {};  // A map to store organizations by their custom `id` for easier reference
  for (const org of ORG_LIST) {
    try {
      await seedOrganization(org, null, orgMap);
    } catch (err) {
      console.error('Error creating organization:', org, err);
    }
  }
}

async function seedOrganization(org, parentId = null, orgMap) {
  const { id, children, ...orgData } = org;

  // Create the organization
  const createdOrg = await Organization.create({
    ...orgData,
    parentId: orgMap[parentId] || parentId, // Use `orgMap` to correctly assign parentId
  });

  // Store the created organization's `_id` using its custom `id`
  orgMap[id] = createdOrg._id;

  if (children && children.length > 0) {
    const childIds = [];
    for (const childOrg of children) {
      const createdChildOrg = await seedOrganization(childOrg, id, orgMap); // Pass the current organization's `id` as the parentId for children
      childIds.push(createdChildOrg._id);
    }

    // Update the organization with its children references
    createdOrg.children = childIds;
    await createdOrg.save();
  }

  return createdOrg;
}

seedDatabase().catch(console.error);
