import { request, gql } from 'graphql-request'

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async () => {
    const query = gql`
    query MyQuery {
        postsConnection {
          edges {
            node {
              author {
                name
                id
                bio
                photo {
                  url
                }
              }
              createdAt
              title
              slug
              excerpt
              featuredImage {
                url
              }
              categories {
                name
                slug
              }
            }
          }
        }
      }
      
    `
    const result = await request(graphqlAPI, query)
    return result.postsConnection.edges;
  }

  export const getRecentPosts = async () => {
    const query = gql`
      query GetPostDetails() {
        posts(
          orderBy: createdAt_ASC
          last: 3
          ) {
            title
            featuredImage {
              url
            }
            createdAt
            slug
          }
      }`
    const result = await request(graphqlAPI, query)
    return result.posts;
  }

  export const getSimilarPosts = async (categories, slug) => {
    const query = gql`
    query GetPostDetails($slug: String!, $categories: [String!]) {
      posts(
        where: {slug_not: $slug, AND: {categories_some: {slug_in: $categories}}}
        last: 3
        ) {
          title
          featuredImage {
            url
          }
          createdAt
          slug
        }
    }`

    const result = await request(graphqlAPI, query, { categories, slug })
    return result.posts
  }

  export const getCategories = async () => {
    const query = gql`
    query GetCatregories {
      categories {
        name
        slug
      }
    }`

    const result = await request(graphqlAPI, query)
    return result.categories
  }

  export const getPostDetails = async (slug) => {
    const query = gql`
    query GetPostDetails($slug : String!) {
      post(where: {slug: $slug}) {
        title
        excerpt
        featuredImage {
          url
        }
        author{
          name
          bio
          photo {
            url
          }
        }
        createdAt
        slug
        content {
          raw
        }
        categories {
          name
          slug
        }
      }
    }
  `;
    const result = await request(graphqlAPI, query, {slug})
    //console.log("logs-----",result.postsConnection.edges)
    return result.post;
  }

export const submitComment = async (obj) => {
  const result = await fetch('/api/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });
  return result.json();
};

export const getComents = async (slug) => {
  const query = gql`
  query getComents($slug: String!) {
    comments(where: { post: { slug: $slug }}){
      name
      createdAt
      comment
    }
  }`

  const result = await request(graphqlAPI, query, {slug})
  return result.comments
}