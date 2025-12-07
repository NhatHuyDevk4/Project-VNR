"use client";

import * as React from "react";

import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { CalendarIcon } from "lucide-react";

export function DateTimePicker({
    value,
    onChange,
    disabled,
    placeholder = "MM/DD/YYYY hh:mm aa",
}: {
    value?: Date
    onChange?: (date?: Date) => void
    disabled?: boolean
    placeholder?: string
}) {
    const [date, setDate] = React.useState<Date | undefined>(value);
    const [isOpen, setIsOpen] = React.useState(false);

    React.useEffect(() => {
        setDate(value);
    }, [value]);

    const isValidDate = (d?: Date) => !!d && d instanceof Date && !isNaN(d.getTime());

    const hours = Array.from({ length: 12 }, (_, i) => i + 1);
    const handleDateSelect = (selectedDate: Date | undefined) => {
        if (!selectedDate) return;
        const prev = value ?? date ?? new Date();
        const merged = new Date(selectedDate);
        merged.setHours(prev.getHours());
        merged.setMinutes(prev.getMinutes());
        setDate(merged);
        onChange?.(merged);
    };

    const handleTimeChange = (
        type: "hour" | "minute" | "ampm",
        value: string
    ) => {
        const base = value ?? date;
        if (base) {
            const newDate = new Date(base);
            if (type === "hour") {
                newDate.setHours(
                    (parseInt(value) % 12) + (newDate.getHours() >= 12 ? 12 : 0)
                );
            } else if (type === "minute") {
                newDate.setMinutes(parseInt(value));
            } else if (type === "ampm") {
                const currentHours = newDate.getHours();
                if (value === "PM" && currentHours < 12) newDate.setHours(currentHours + 12);
                if (value === "AM" && currentHours >= 12) newDate.setHours(currentHours - 12);
            }
            setDate(newDate);
            onChange?.(newDate);
        }
    };

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    disabled={disabled}
                    className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {isValidDate(date) ? (
                        format(date as Date, "MM/dd/yyyy hh:mm aa")
                    ) : (
                        <span>{placeholder}</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <div className="sm:flex">
                    <Calendar
                        mode="single"
                        selected={isValidDate(date) ? date : undefined}
                        onSelect={handleDateSelect}
                        initialFocus
                    />
                    <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
                        <ScrollArea className="w-64 sm:w-auto">
                            <div className="flex sm:flex-col p-2">
                                {hours.reverse().map((hour) => (
                                    <Button
                                        key={hour}
                                        size="icon"
                                        variant={
                                            date && date.getHours() % 12 === hour % 12
                                                ? "default"
                                                : "ghost"
                                        }
                                        className="sm:w-full shrink-0 aspect-square"
                                        onClick={() => handleTimeChange("hour", hour.toString())}
                                    >
                                        {hour}
                                    </Button>
                                ))}
                            </div>
                            <ScrollBar orientation="horizontal" className="sm:hidden" />
                        </ScrollArea>
                        <ScrollArea className="w-64 sm:w-auto">
                            <div className="flex sm:flex-col p-2">
                                {Array.from({ length: 12 }, (_, i) => i * 5).map((minute) => (
                                    <Button
                                        key={minute}
                                        size="icon"
                                        variant={
                                            date && date.getMinutes() === minute
                                                ? "default"
                                                : "ghost"
                                        }
                                        className="sm:w-full shrink-0 aspect-square"
                                        onClick={() =>
                                            handleTimeChange("minute", minute.toString())
                                        }
                                    >
                                        {minute}
                                    </Button>
                                ))}
                            </div>
                            <ScrollBar orientation="horizontal" className="sm:hidden" />
                        </ScrollArea>
                        <ScrollArea className="">
                            <div className="flex sm:flex-col p-2">
                                {["AM", "PM"].map((ampm) => (
                                    <Button
                                        key={ampm}
                                        size="icon"
                                        variant={
                                            date &&
                                                ((ampm === "AM" && date.getHours() < 12) ||
                                                    (ampm === "PM" && date.getHours() >= 12))
                                                ? "default"
                                                : "ghost"
                                        }
                                        className="sm:w-full shrink-0 aspect-square"
                                        onClick={() => handleTimeChange("ampm", ampm)}
                                    >
                                        {ampm}
                                    </Button>
                                ))}
                            </div>
                        </ScrollArea>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}