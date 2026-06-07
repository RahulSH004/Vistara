export declare function cancelbooking(booking_id: string, user_id: string): Promise<{
    id: string;
    status: "pending" | "confirmed" | "cancelled" | "completed";
    cancelled_at: Date | null;
}>;
//# sourceMappingURL=cancel_booking_service.d.ts.map