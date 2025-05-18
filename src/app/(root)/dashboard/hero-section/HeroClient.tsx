"use client";

import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchHero, upsertHero } from "@/utils/actions";
import { IHero } from "@/types/allTypes";
import Skeleton from "./loading";
import Form from "./Form";
import toast from "react-hot-toast";

export default function HeroClient() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["hero"],
    queryFn: fetchHero,
  });


 
  useEffect(() => {
    if (data) {
      setFormData({
        title: data.title || "",
        subTitle: data.subTitle || "",
        image: data.image || "",
        slug: data.slug || "unique-hero-id",
      });
    }
    console.log(data)
  }, [data]);

  const [formData, setFormData] = useState<IHero>({
    title: data?.title || "",
    subTitle: data?.subTitle || "",
    image: data?.image || "",
    slug: "unique-hero-id" as "unique-hero-id",
  });

   
  
    const [isSaving, setIsSaving] = useState(false);
    const queryClient = useQueryClient();
  
    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const { name, value, type } = e.target as HTMLInputElement;
  
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
      }));
    };
  
  
    const handleSave = async () => {
      setIsSaving(true);
  
      try {
        await upsertHero(formData);
        toast.success("Hero updated successfully");  
  
        queryClient.invalidateQueries({ queryKey: ["hero"] });
      } catch (error) {
        toast.error(" Failed to save hero section.");
      } finally {
        setIsSaving(false);
      }
    };

  
 
 

  if (isLoading) return <Skeleton />;

  if (error)
    return (
      <p className="flex justify-center items-center min-h-screen text-red-500 text-center">
        Error fetching hero section.
      </p>
    );

  return (
    <div className="flex flex-col h-screen">

      

      <Form formData={formData} setFormData={setFormData} handleChange={handleChange} handleSave={handleSave} isSaving={isSaving} />
      
  
    </div>
  );
}
