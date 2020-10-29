using DeliveryConfirmation.Common.Enums;
using System;
using System.Runtime.Serialization;

namespace DeliveryConfirmation.Shared.Dto
{
    [DataContract]
    public class ShipmentDto : BaseDto
    {
        [DataMember]
        public int ShipmentId { get; set; }

        [DataMember]
        public string OriginName { get; set; }

        [DataMember]
        public string OriginAddress { get; set; }

        [DataMember]
        public string DestinationName { get; set; }

        [DataMember]
        public string DestinationAddress { get; set; }


        [DataMember]
        public TruckDto Truck { get; set; }

        [DataMember]
        public ShipmentStatuses Status { get; set; }

        [DataMember]
        public int PackagesNumber { get; set; }

        [DataMember]
        public string TrackingNumber { get; set; }

        [DataMember]
        public bool? Delivered { get; set; }

        [DataMember]
        public DateTime? DeliveredDate { get; set; }

        [DataMember]
        public bool? CustomerWasHome { get; set; }

        [DataMember]
        public bool? PackageWasDamaged { get; set; }

        [DataMember]
        public string Notes { get; set; }

        [DataMember]
        public IncidentalInformations IncidentalInformation { get; set; }

        [DataMember]
        public string IncidentalInformationText { get; set; }
    }
}