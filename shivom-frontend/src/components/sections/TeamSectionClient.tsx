'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ITeam } from '@/types';
import { cn } from '@/lib/utils/cn';

interface Props {
  team: ITeam[];
}

export function TeamSectionClient({ team }: Props) {
  if (team.length === 0) return null;

  return (
    <motion.div
      className={cn(
        "grid gap-8 mt-16 justify-center justify-items-center w-full",
        team.length === 1 && "grid-cols-1 max-w-sm mx-auto",
        team.length === 2 && "grid-cols-1 sm:grid-cols-2 max-w-3xl mx-auto",
        team.length === 3 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto",
        team.length >= 4 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
      )}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.15,
          },
        },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      {team.map((member: ITeam) => (
        <motion.div
          key={member._id}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.5 },
            },
          }}
          className="bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between w-full max-w-sm"
        >
          <div>
            <div className="team-avatar w-44 h-44 rounded-full border-4 border-[#0B1F4D] mx-auto mb-8 relative overflow-hidden bg-gray-100">
              <Image
                loading="lazy"
                src={member.image || 'https://dummyimage.com/180x180/ffffff/0b1f4d.png&text=Avatar'}
                alt={member.name}
                fill
                sizes="176px"
                className="object-cover"
              />
            </div>
          </div>

          <div className="team-info-box bg-gray-50 rounded-xl p-6 w-full">
            <h3 className="text-[22px] font-bold text-[#111827] mb-1">{member.name}</h3>
            <p className="text-base font-semibold text-[#F97316] mb-1">
              {member.position || member.designation}
            </p>
            {member.department && (
              <p className="text-sm font-normal text-[#6B7280]">{member.department}</p>
            )}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
