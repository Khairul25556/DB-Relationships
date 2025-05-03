# Mongoose Middleware: Handling Related Document Deletion & Database Relationships

## Overview
This is an example of using Mongoose middleware to handle the deletion of related documents when a primary document is deleted from a MongoDB collection. In this case, when a `Customer` document is deleted, any related `Order` documents associated with that `Customer` will also be deleted.

## Key Concepts

- **`findOneAndDelete()`**: A Mongoose method that finds and deletes a document by its `_id`.
- **`post()` Middleware**: A Mongoose middleware that runs after a specified operation (like `findOneAndDelete()`) is completed.
- **`deleteMany()`**: A MongoDB operation that deletes multiple documents based on a filter. In this case, deleting all `Order` documents related to the deleted `Customer`.

## Middleware Flow

1. **Delete Customer**: The `Customer` is deleted from the database using `findByIdAndDelete()` or `findOneAndDelete()`.
2. **Post Middleware**: After the deletion, the `post("findOneAndDelete")` middleware is triggered. This allows us to check if the `Customer` document had any associated `orders`.
3. **Delete Orders**: If there are any `orders` related to the deleted `Customer`, the middleware will delete those `Order` documents using the `Order.deleteMany()` method.


## MongoDB Relationships: One-to-Many

In MongoDB, a **One-to-Many** relationship can be defined in three main ways:

### 1. Embedding Documents (One-to-Many)

In this method, the related data is stored directly inside the parent document. The parent document contains an array of sub-documents, creating a **One-to-Many** relationship within a single collection.

### 2. Referencing Documents (One-to-Many)

Here, the related data is stored in a separate collection. The parent document holds references (usually ObjectIds) to the related documents. This allows for a **One-to-Many** relationship between two collections.

### 3. Populating References (One-to-Many)

When using references, **populate()** is used to retrieve and combine the referenced documents. This allows us to fetch the related documents from the referenced collection and embed them into the parent document when queried.

