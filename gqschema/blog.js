const { gql } = require("apollo-server-express");
module.exports = gql`
  type Blog {
    id: ID
    title: String
    content: String
    status: String
    url: String
    feature_image: customObject
    meta: customObject
    date: Date
    updated: Date
  }

  type BlogTag {
    id: ID
    name: String
    url: String
    date: Date
    updated: Date
  }

  extend type Query {
    blogs: [Blog]
    blog(id: ID!): Blog
    blogtags: [BlogTag]
  }

  extend type Mutation {
    addBlog(
      title: String
      content: String
      status: String
      url: String
      feature_image: Upload
      meta: customObject
    ): [Blog]
    updateBlog(
      id: ID!
      title: String
      content: String
      status: String
      url: String
      updatedImage: Upload
      meta: customObject
    ): [Blog]
    deleteBlog(id: ID!): [Blog]
    addBlogTag(name: String, url: String): [BlogTag]
    updateBlogTag(id: ID!, name: String, url: String): [BlogTag]
    deleteBlogTag(id: ID!): [BlogTag]
  }
`;
