export const getPosts = async (category = null) => {
  try {
    const posts = await prisma.post.findMany({
      where: category ? { category } : {}, // Filter posts by category if provided
      select: {
        title: true,
        category: true,
        thumbnailURL: true,
        videoURL: true,
        content: true,
        comments: {
          select: {
            id: true,
            comment: true,
            createdAt: true,
            User: {
              select: {
                username: true,
              },
            },
          },
          orderBy: {
            createdAt: "asc",
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};
