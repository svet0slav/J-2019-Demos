using System.ComponentModel;

namespace DeliveryConfirmation.Common.Enums
{
    /// <summary>
    /// Statuses of the shipment. Must start with OutForDelivery and end with Delivered or Cancelled.
    /// </summary>
    public enum ShipmentStatuses
    {
        [Description("Unknown")]
        Unknown = 0,

        [Description("Out-For-Delivery")]
        OutForDelivery = 2,

        [Description("HeldInTruck")]
        OnTruck = 3,

        [Description("Delivered")]
        Delivered = 4,

        [Description("Cancelled")]
        Cancelled = 99
    }
}
