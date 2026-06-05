import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isEqual,
  isSameMonth,
  isToday,
  parse,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import {ptBR} from "date-fns/locale";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { cn } from "src/lib/utils";

interface Subscription {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  icon: string;
  color: string;
}
interface SubscriptionDay {
  date: Date;
  subscriptions: Subscription[];
  isCurrentMonth: boolean;
}
export default function EventCalendar() {
  const [subscriptions] = React.useState<Subscription[]>([
    {
      id: "1",
      name: "SGF",
      startTime: "2026-06-05T14:00:00-07:00",
      endTime: "2026-06-05T16:00:00-07:00",
      icon: "https://cdn.prod.website-files.com/65f20ae26ba45240543579bc/664ffa4b99de65eb9ec3cb84_Webclip.png",
      color: "#FF6B6B",
    },
    {
      id: "3",
      name: "Day of the Devs",
      startTime: "2026-06-05T16:00:00-07:00",
      endTime: "2026-06-05T18:00:00-07:00",
      icon: "https://www.dayofthedevs.org/assets/images/favicon.svg",
      color: "#fa6ba2",
    },
    {
      id: "2",
      name: "State of Play",
      startTime: "2026-06-02T14:00:00-07:00",
      endTime: "2026-06-02T15:00:00-07:00",
      icon: "https://img.icons8.com/?size=100&id=13629&format=png&color=000000",
      color: "#2e6db4",
    },
    {
      id: "4",
      name: "Wholesome Direct",
      startTime: "2026-06-06T09:00:00-07:00",
      endTime: "2026-06-06T10:00:00-07:00",
      icon: "https://wholesomegames.com/assets/images/favicon.png?v=124e8977",
      color: "#1c2140",
    },
    {
      id: "5",
      name: "Story Rich Showcase",
      startTime: "2026-06-06T10:00:00-07:00",
      endTime: "2026-06-02T11:00:00-07:00",
      icon: "https://images.squarespace-cdn.com/content/v1/5fb4b2ecf5b4445159228aca/7f69e36c-bd8d-4033-b522-bfaaba8177e8/favicon.ico?format=100w",
      color: "#e0c443",
    },
    {
      id: "6",
      name: "XBOX Games Showcase 2026",
      startTime: "2026-06-07T10:00:00-07:00",
      endTime: "2026-06-07T12:00:00-07:00",
      icon: "https://logodix.com/logo/20228.png",
      color: "#107c10",
    },
    {
      id: "7",
      name: "PC Gaming Show",
      startTime: "2026-06-07T12:00:00-07:00",
      endTime: "2026-06-07T13:30:00-07:00",
      icon: "https://www.pcgamingshow.com/wp-content/uploads/2024/09/pcgs_2026_logo_site_080426-384x229.png",
      color: "#ad1f24"
    },
    {
      id: "8",
      name: "Future Games Show",
      startTime: "2026-06-06T12:00:00-07:00",
      endTime: "2026-06-06T13:00:00-07:00",
      icon: "https://cdn.prod.website-files.com/655cdae3ab58ca82983ab58c/6596954578fcb3c67ffd9b87_summerwhite.png",
      color: "#1e88a9"
    }
  ]);
  const [currentMonth, setCurrentMonth] = React.useState(
    format(new Date("2026-06-05T14:00:00-07:00"), "MMM-yyyy", {
      locale: ptBR
    }),
  );
  const firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());
  const days = React.useMemo(() => {
    const start = startOfWeek(startOfMonth(firstDayCurrentMonth), { weekStartsOn: 1 });
    const end = endOfWeek(endOfMonth(firstDayCurrentMonth));
    return eachDayOfInterval({ start, end }).map(
      (day): SubscriptionDay => ({
        date: day,
        subscriptions: subscriptions.filter(
          (subscription) => {
            const subDate = new Date(subscription.startTime);
            return subDate.getDate() === day.getDate() &&
              subDate.getMonth() === day.getMonth() &&
              subDate.getFullYear() === day.getFullYear();
          },
        ),
        isCurrentMonth: isSameMonth(day, firstDayCurrentMonth),
      }),
    );
  }, [firstDayCurrentMonth, subscriptions]);
  /*function previousMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }
  function nextMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }*/
  return (
    <div className="p-4 mx-auto w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          {/*<Button
              variant="outline"
              className="p-2 opacity-75 hover:opacity-100"
              onClick={previousMonth}
          >
            <ChevronLeft className="size-4"/>
          </Button>
            <Button
            variant="outline"
            className="p-2 opacity-75 hover:opacity-100"
            onClick={nextMonth}
        >
          <ChevronRight className="size-4"/>
        </Button>*/
        }
          <motion.h2
            key={currentMonth}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl font-semibold"
          >
            {format(firstDayCurrentMonth, "MMMM yyyy",  {
              locale: ptBR
            })}
          </motion.h2>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-px bg-muted rounded-lg overflow-hidden">
        <AnimatePresence mode="wait">
          {["SEG", "TER", "QUA", "QUI", "SEX", "SÁB", "DOM"].map((day) => (
            <motion.div
              key={day}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-2 text-center text-sm font-medium bg-background"
            >
              {day}
            </motion.div>
          ))}
          {days.map((day, dayIdx) => (
            <motion.div
              key={format(day.date, "yyyy-MM-dd", {
                locale: ptBR
              })}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: dayIdx * 0.02 }}
              className={cn(
                "relative p-2 bg-background min-h-25",
                !day.isCurrentMonth && "bg-muted/50",
                isEqual(day.date, new Date()) && "bg-accent",
              )}
            >
              <time
                dateTime={format(day.date, "yyyy-MM-dd", {
                  locale: ptBR
                })}
                className={cn(
                  "text-sm",
                  isToday(day.date) && "font-semibold text-primary",
                  !day.isCurrentMonth && "text-muted-foreground",
                )}
              >
                {format(day.date, "d", {
                  locale: ptBR
                })}
              </time>
              <div className="space-y-1 mt-1">
                {day.subscriptions.map((subscription) => (
                  <motion.div
                    key={subscription.id}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-1 p-1 rounded bg-background border text-sm group"
                    style={{ borderColor: subscription.color }}
                  >
                    <div className="relative size-4">
                      <img
                        src={subscription.icon}
                        alt={subscription.name}
                        className="rounded-sm object-cover"
                      />
                    </div>
                    <span className="text-xs flex-1">
                      {subscription.name}
                    </span>
                    <span className="text-[10px] text-muted-foreground shrink-0">
                      {format(new Date(subscription.startTime), "HH:mm")}-{format(new Date(subscription.endTime), "HH:mm")}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
