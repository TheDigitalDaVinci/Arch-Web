import { notFound } from "next/navigation";
import { services } from "@/data/content";
import ServiceDetailClient from "./ServiceDetailClient";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return services.map((service) => ({
    id: service.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const service = services.find((s) => s.id === id);

  if (!service) {
    return {
      title: "Service Not Found | White Rock Builders & Interiors",
    };
  }

  return {
    title: `${service.title} | White Rock Builders & Interiors`,
    description: service.description,
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const service = services.find((s) => s.id === id);

  if (!service) {
    notFound();
  }

  // Find other services for related navigation
  const currentIndex = services.findIndex((s) => s.id === id);
  const otherServices = services.filter((s) => s.id !== id).slice(0, 3);

  return (
    <ServiceDetailClient
      service={service}
      serviceIndex={currentIndex}
      allServices={services}
      otherServices={otherServices}
    />
  );
}
