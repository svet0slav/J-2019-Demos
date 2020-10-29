using DeliveryConfirmation.Shared.Dto;
using DeliveryConfirmation.Shared.Request;
using DeliveryConfirmation.Shared.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;
using System.Threading.Tasks;

namespace DeliveryConfirmation.Shared.Service
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "IService1" in both code and config file together.
    [ServiceContract]
    public interface IDeliveryConfirmationService
    {
        [OperationContract]
        Task<PagedResponse<TruckDto>> GetTrucks(PagingRequest paging);

        [OperationContract]
        Task<PagedResponse<ShipmentDto>> GetShipments(int truckId, PagingRequest paging);

        [OperationContract]
        Task<ShipmentDto> UpdateShipmentDelivered(int shipmentId);

        [OperationContract]
        Task<ShipmentDto> UpdateShipmentHeldOnTruck(int shipmentId);
    }


    // Use a data contract as illustrated in the sample below to add composite types to service operations.
    [DataContract]
    public class CompositeType
    {
        bool boolValue = true;
        string stringValue = "Hello ";

        [DataMember]
        public bool BoolValue
        {
            get { return boolValue; }
            set { boolValue = value; }
        }

        [DataMember]
        public string StringValue
        {
            get { return stringValue; }
            set { stringValue = value; }
        }
    }
}
