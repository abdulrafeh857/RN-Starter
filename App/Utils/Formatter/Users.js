const UsersFormatter = {
  getUsers: (_) => {
    return {
      id: _.id,
      email: _.email,
      firstName: _.first_name,
      lastName: _.last_name,
      dateJoined: _.date_joined,
      isActive: _.is_active,
      lastLogin: _.last_login,
      phone: _.phone,
    };
  },
};

// Export
export default UsersFormatter;
