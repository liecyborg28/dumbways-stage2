import { Request, Response } from "express";
import { prisma } from "../connections/clients";

export const getPost = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);

    const post = await prisma.post.findUnique({ where: { id } });

    res.status(200).json(post);
  } catch (error) {}
};

export const getPosts = async (req: Request, res: Response) => {
  try {
    const { category } = req.query;

    const posts = await prisma.post.findMany({
      where: category ? { category: String(category) } : {},
      include: {
        user: { select: { id: true, name: true } },
        _count: { select: { comments: true } },
      },
    });

    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getPostComments = async (req: Request, res: Response) => {
  try {
    const postId = parseInt(req.params.id);
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 5;
    const skip = (page - 1) * limit;

    const totalComments = await prisma.comment.count({
      where: { postId },
    });

    const comments = await prisma.comment.findMany({
      where: { postId },
      skip,
      take: limit,
    });

    res.json({
      page,
      limit,
      totalPages: Math.ceil(totalComments / limit),
      totalComments,
      data: comments,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getCommentsSummary = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 5;
    const skip = (page - 1) * limit;
    const minComments = parseInt(req.query.minComments as string) || 0;
    const category = req.query.category
      ? String(req.query.category)
      : undefined;

    // Group by postId → hitung jumlah komentar
    const grouped = await prisma.comment.groupBy({
      by: ["postId"],
      _count: { id: true },
    });

    // Filter berdasarkan jumlah komentar
    let filtered = grouped.filter((g) => g._count.id > minComments);

    // Ambil detail Post + filter kategori kalau ada
    const enriched = await Promise.all(
      filtered.map(async (g) => {
        const post = await prisma.post.findUnique({
          where: { id: g.postId },
          select: { id: true, title: true, category: true },
        });
        if (!post) return null;
        if (category && post.category !== category) return null;
        return {
          post,
          totalComments: g._count.id,
        };
      })
    );

    // Bersihkan null hasil filter kategori
    const valid = enriched.filter((x) => x !== null);

    // Pagination manual
    const paginated = valid.slice(skip, skip + limit);

    res.json({
      page,
      limit,
      totalPages: Math.ceil(valid.length / limit),
      totalPosts: valid.length,
      data: paginated,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
