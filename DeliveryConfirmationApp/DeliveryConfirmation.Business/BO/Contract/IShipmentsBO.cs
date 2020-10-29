using DeliveryConfirmation.Common.Enums;
using DeliveryConfirmation.Shared.Entities.Entities;
using DeliveryConfirmation.Shared.Request;
using DeliveryConfirmation.Shared.Response;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DeliveryConfirmation.Business.BO.Contract
{
    public interface IShipmentsBO
    {
        Task<PagedResponse<Shipment>> GetByTruck(int truckId, PagingRequest paging);
        Task<bool> UpdateStatus(int shipmentId, ShipmentStatuses newStatus);
        Task<Shipment> GetShipmentById(int shipmentId);
    }
}