const { Users } = require("../models");

module.exports = {
  create(createArgs) {
    return Users.create(createArgs);
  },

  update(updateArgs,id) {
    return Users.update(updateArgs,{
      where:{id}
    })
  },

  delete(id) {
    return Users.Destroy({ where: { id } });
  },

  find(id) {
    return Users.findOne({ where: { id } });
  },

  findAll() {
    return Users.findAll();
  },
};
