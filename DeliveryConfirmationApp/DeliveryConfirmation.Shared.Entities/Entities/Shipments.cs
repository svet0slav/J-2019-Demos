using DeliveryConfirmation.Common.Enums;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace DeliveryConfirmation.Shared.Entities.Entities
{
    public class Shipment
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ShipmentId { get; set; }
        public string OriginName { get; set; }
        public string OriginAddress { get; set; }

        public string DestinationName { get; set; }
        public string DestinationAddress { get; set; }

        public int TruckId { get; set; }

        public virtual Truck Truck { get; set; }

        public int StatusId { get; set; }
        public virtual ShipmentStatuses Status { get; set; }
        public int PackagesNumber { get; set; }

        public string TrackingNumber { get; set; }

        public bool? Delivered { get; set; }

        public DateTime? DeliveredDate { get; set; }

        public bool? CustomerWasHome { get; set; }
        public bool? PackageWasDamaged { get; set; }
        public string Notes { get; set; }

        public DateTime CreationDate { get; set; }
        public DateTime ModifiedDate { get; set; }

        public int IncidentalInformationId { get; set; }

        public virtual IncidentalInformations IncidentalInformation { get; set; }

        public string IncidentalInformationText { get; set; }

        public Shipment()
        {
            Status = ShipmentStatuses.Unknown;
            IncidentalInformation = IncidentalInformations.None;
            CreationDate = DateTime.Now;
            ModifiedDate = DateTime.Now;
        }
    }
}
