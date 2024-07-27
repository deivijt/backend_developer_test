class ResourceNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "ResourceNotFoundError";
  }
}

class DatabaseError extends Error {
  constructor(message) {
    super(message);
    this.name = "DatabaseError";
  }
}

module.exports = {
  ResourceNotFoundError,
  DatabaseError,
};
