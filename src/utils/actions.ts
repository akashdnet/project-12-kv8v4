'use server';

import { IAd, IEvent, IGallery, IGuestlist, IHero, IVenue } from "@/types/allTypes";
import { prisma } from "@/utils/prisma";
import { v2 as cloudinary } from "cloudinary";



cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(formData: FormData) {
  "use server";

  const file = formData.get("file") as File | null;

  if (!file) {
    throw new Error("didn't find file");
  }

  // Convert File to Buffer
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Upload to Cloudinary
  const result = await new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "events", // optional folder
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      }
    );

    uploadStream.end(buffer);
  });

  return (result as any).secure_url;
}





export async function fetchPosts() {
  try {
    return await prisma.post.findMany();
  } catch (error) {
    throw new Error("Failed to fetch posts");
  }
}


export async function createPost(data: { title: string; content: string }) {
  try {
    return await prisma.post.create({ data });
  } catch (error) {
    throw new Error("Failed to create post");
  }
}


export async function updatePost(id: string, data: { title: string; content: string }) {
    try {
      return await prisma.post.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw new Error("Failed to update post");
    }
  }

  
export async function duplicatePost(data: { title: string; content: string }) {
  try {
    return await prisma.post.create({ data });
  } catch (error) {
    throw new Error("Failed to duplicate post");
  }
}


export async function deletePost(id: string) {
    try {
      await prisma.post.delete({ where: { id } });
      return { success: true };
    } catch (error) {
      throw new Error("Failed to delete post");
    }
  }









  export async function fetchEvents() {
    try {
      const events = await prisma.event.findMany({
        orderBy: { createdAt: "desc" } // Latest event first
      });
      return events;
    } catch (error) {
      console.error("Error fetching events:", error);
      return [];
    }
  }


  export async function createEvent(data:any) {
    try {
      const newEvent = await prisma.event.create({
        data: {
          ...data,
          startDate: new Date(data.startDate),
          minAge: parseInt(data.minAge),
          cost: parseFloat(data.cost),
          
        },
      });
  
  
      return newEvent;
    } catch (error) {
      console.error("Create Event Error:", error);
      throw new Error("Failed to create event");
    }
  }
  

  export async function updateEvent(id: string, data: any) {
    try {
      const updatedEvent = await prisma.event.update({
        where: { id },
        data: {
          ...data,
          startDate: data.startDate ? new Date(data.startDate) : undefined,
          minAge: data.minAge ? parseInt(data.minAge) : undefined,
          cost: data.cost ? parseFloat(data.cost) : undefined,
        },
      });
  
  
      return updatedEvent;
    } catch (error) {
      console.error("Update Event Error:", error);
      throw new Error("Failed to update event");
    }
  }


  export async function deleteEvent(id: string) {
    try {
      await prisma.event.delete({ where: { id } });
      return { success: true };
    } catch (error) {
      throw new Error("Failed to delete post");
    }
  }







// this is for guestlist 
export async function fetchGuestlist() {
  try {
    const data = await prisma.guestlist.findMany({
      orderBy: { createdAt: "desc" } // Latest event first
    });
    return data;
  } catch (error: any) {
    throw new Error("Failed to fetch guestlist: " + error.message);
  }
}

export async function createGuestlist(data: IGuestlist) {
  try {
    const newGuest = await prisma.guestlist.create({
      data: {
        ...data,
        startDate: data.startDate ? new Date(data.startDate) : undefined,
        numberOfGuests: Number(data.numberOfGuests)         
      },
    });

    return newGuest;
  } catch (error :any) {
    // console.error("Create Guestlist Error:", error);
    throw new Error("Failed to create guestlist " + error.message);
  }
}

export async function updateGuestlist(id: string, data: any) {
  try {
    const updatedEvent = await prisma.guestlist.update({
      where: { id },
      data: {
        ...data,
        startDate: data.startDate ? new Date(data.startDate) : undefined,
      },
    });


    return updatedEvent;
  } catch (error) {
    console.error("Update Event Error:", error);
    throw new Error("Failed to update Guestlist");
  }
}

export async function deleteGuestlist(id: string) {
  try {
    await prisma.guestlist.delete({ where: { id } });
    return { success: true };
  } catch (error) {
    throw new Error("Failed to delete Guestlist");
  }
}





// this is for Hero 
export async function fetchHero() {
  const data = await prisma.hero.findFirst({where: { slug: "unique-hero-id" }, });
  return data;
}


export async function upsertHero(data: IHero) {
  const {image,title,subTitle} =data;
  const newData = {image,title,subTitle}
  const finalData = await prisma.hero.upsert({
    where: { slug: "unique-hero-id" }, 
    update: { ...newData },
    create: {
      slug: "unique-hero-id",
      title: "My Hero Section Title",
      subTitle: "Optional Subtitle",
      image: ""
    },
  });

  return finalData
}




export async function fetchVenue() {
  try {
    const data = await prisma.venue.findMany({
      orderBy: { createdAt: "desc" } // Latest event first
    });

    return data;
  } catch (error: any) {
    throw new Error("Failed to fetch Venue : " + error.message);
  }
}

export async function createVenue(data: IVenue) {
  try {
    const newGuest = await prisma.venue.create({
      data: {
        ...data,
        date: data.date ? new Date(data.date) : undefined,       
      },
    });

    return newGuest;
  } catch (error :any) {
    throw new Error("Failed to create venue " + error.message);
  }
}

export async function updateVenue(slug: string, data: any) {
  try {
    const updatedEvent = await prisma.venue.update({
      where: { slug },
      data: {
        ...data,
        date: data.date ? new Date(data.date) : undefined,
      },
    });


    return updatedEvent;
  } catch (error) {
    console.error("Update Venue Error:", error);
    throw new Error("Failed to update Venue.");
  }
}

export async function deleteVenue(slug: string) {
  try {
    await prisma.venue.delete({ where: { slug } });
    return { success: true };
  } catch (error) {
    throw new Error("Failed to delete Venue.");
  }
}








export async function fetchGalleries() {
  try {
    const data = await prisma.gallery.findMany({
      orderBy: { createdAt: "desc" } // Latest event first
    });

    return data;
  } catch (error: any) {
    throw new Error("Failed to fetch Venue : " + error.message);
  }
}


export async function createGallery(data:IGallery) {
  try {
    const newGuest = await prisma.gallery.create({
      data: {
        ...data,
        createdAt: data.createdAt ? new Date(data.createdAt) : undefined,       
      },
    });

    return newGuest;
  } catch (error :any) {
    throw new Error("Failed to create venue " + error.message);
  }
}



export async function updateGallery(slug: string, data: IGallery) {
  try {
    const updatedData = await prisma.gallery.update({
      where: { slug },
      data: {
        ...data,
        createdAt: data.createdAt ? new Date(data.createdAt) : undefined,
      },
    });


    return updatedData;
  } catch (error) {
    console.error("Update gallery Error:", error);
    throw new Error("Failed to update gallery.");
  }
}


export async function deleteGallery(slug: string) {
  try {
    await prisma.gallery.delete({ where: { slug } });
    return { success: true };
  } catch (error) {
    throw new Error("Failed to delete Gallery.");
  }
}






export async function fetchAd() {
  try {
    const data = await prisma.ad.findMany({
      orderBy: { position: "asc" } // Latest event first
    });

    return data;
  } catch (error: any) {
    throw new Error("Failed to fetch Ads : " + error.message);
  }
}


export async function createAd(data:IAd) {
  try {
    const newData = await prisma.ad.create({
      data: {
        ...data,
        createdAt: data.createdAt ? new Date(data.createdAt) : undefined, 
        position: Number(data.position)      
      },
    });

    return newData;
  } catch (error :any) {
    throw new Error("Failed to create ad " + error.message);
  }
}



export async function updateAd(position: Number, data: IAd) {
  try {
    const updatedData = await prisma.ad.update({
      where: { position },
      data: {
        ...data,
        createdAt: data.createdAt ? new Date(data.createdAt) : undefined,
      },
    });


    return updatedData;
  } catch (error) {
    console.error("Update ad Error:", error);
    throw new Error("Failed to ad ad.");
  }
}


export async function deleteAd(position: number) {
  try {
    await prisma.ad.delete({ where: { position } });
    return { success: true };
  } catch (error : any) {
    throw new Error(`Failed to delete ad: ${error.message}`);
  }
}















