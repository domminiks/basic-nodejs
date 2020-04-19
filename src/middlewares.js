const { isUuid } = require("uuidv4");

module.exports = {
  
  checkPostInputs(request, response, next) {
    const { title, url, techs} = request.body;
    if (title === undefined && url === undefined && techs === undefined) {
      return response.status(400).json({
        "error": "'title', 'url' and 'techs' must be specified."
      })
    }
    if (title === undefined || title === '') {
      return response.status(400).json({
        "error": "'title' must be specified."
      })
    }
    if (url === undefined || url === '') {
      return response.status(400).json({
        "error": "'url' must be specified."
      })
    }
    if (techs === undefined || techs === []) {
      return response.status(400).json({
        "error": "'techs' must be specified."
      })
    }
    return next();
  },

  checkId(request, response, next) {
    const { id } = request.params;
    if (!isUuid(id)) {
      return response.status(400).json({
        "error" : "Not a valid uuid."
      })
    }
    return next();
  }

}