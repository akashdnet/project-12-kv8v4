import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export const galleries = [
  {
    title: "London Cityscapes",
    slug: "london-cityscapes",
    featureImage: "https://images.unsplash.com/photo-1745933229147-68202b50274b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0NHx8fGVufDB8fHx8fA%3D%3D",
    images: [
      "https://images.unsplash.com/photo-1745933229147-68202b50274b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0NHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1745933229147-68202b50274b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0NHx8fGVufDB8fHx8fA%3D%3D"
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Scottish Highlands",
    slug: "scottish-highlands",
    featureImage: "https://images.unsplash.com/photo-1745933229147-68202b50274b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0NHx8fGVufDB8fHx8fA%3D%3D",
    images: [
      "https://images.unsplash.com/photo-1745933229147-68202b50274b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0NHx8fGVufDB8fHx8fA%3D%3D"
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Cambridge Architecture",
    slug: "cambridge-architecture",
    featureImage: "https://images.unsplash.com/photo-1745933229147-68202b50274b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0NHx8fGVufDB8fHx8fA%3D%3D",
    images: [
      "https://images.unsplash.com/photo-1745933229147-68202b50274b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0NHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1745933229147-68202b50274b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0NHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1745933229147-68202b50274b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0NHx8fGVufDB8fHx8fA%3D%3D"
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Countryside of Wales",
    slug: "countryside-of-wales",
    featureImage: "https://images.unsplash.com/photo-1745933229147-68202b50274b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0NHx8fGVufDB8fHx8fA%3D%3D",
    images: [
      "https://images.unsplash.com/photo-1745933229147-68202b50274b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0NHx8fGVufDB8fHx8fA%3D%3D"
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Historic Oxford",
    slug: "historic-oxford",
    featureImage: "https://images.unsplash.com/photo-1745933229147-68202b50274b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0NHx8fGVufDB8fHx8fA%3D%3D",
    images: [
      "https://images.unsplash.com/photo-1745933229147-68202b50274b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0NHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1745933229147-68202b50274b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0NHx8fGVufDB8fHx8fA%3D%3D"
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  }
];









async function createDummyPosts() {
 
  try {  

    const post = await prisma.gallery.createMany({
        data: galleries
      })

    console.log(`✅ Successfully added ${post} venue`);
  } catch (error) {
    console.error("❌ Error seeding data:", error.message);
  }
}

createDummyPosts();