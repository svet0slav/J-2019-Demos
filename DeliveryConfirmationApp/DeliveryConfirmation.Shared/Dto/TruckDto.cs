using System.Runtime.Serialization;

namespace DeliveryConfirmation.Shared.Dto
{
    [DataContract]
    public class TruckDto : BaseDto
    {
        [DataMember]
        public int TruckId { get; set; }

        [DataMember]
        public string TruckNumber { get; set; }

        [DataMember]
        public string TruckModel { get; set; }
    }
}