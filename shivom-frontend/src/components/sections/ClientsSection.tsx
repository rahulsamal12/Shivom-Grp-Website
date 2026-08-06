import { clientsService } from '@/services/clients.service';
import { SectionHeading } from '../ui/SectionHeading';
import { IClient } from '@/types';
import Image from 'next/image';

export async function ClientsSection() {
  let clients: IClient[] = [];

  try {
    clients = await clientsService.getClients();
  } catch {
    // Return empty grid on API failure
  }

  if (clients.length === 0) return null;

  return (
    <section className="py-24 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading title="Trusted By Leaders" subtitle="Our Clients" />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mt-16">
          {clients.map((client: IClient) => (
            <div
              key={client._id}
              className="h-24 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center p-4 group hover:bg-white hover:border-brand-orange/30 hover:shadow-lg transition-all duration-300 cursor-pointer relative overflow-hidden"
            >
              {client.logo ? (
                <div className="relative w-full h-full opacity-60 group-hover:opacity-100 transition-opacity">
                  <Image loading="lazy" src={client.logo} alt={client.name} fill className="object-contain" />
                </div>
              ) : (
                <span className="font-bold text-gray-400 group-hover:text-brand-navy text-lg text-center transition-colors">
                  {client.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
