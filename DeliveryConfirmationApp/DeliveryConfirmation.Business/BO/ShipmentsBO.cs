using DeliveryConfirmation.Business.BO.Contract;
using DeliveryConfirmation.Business.Extensions;
using DeliveryConfirmation.Common.Enums;
using DeliveryConfirmation.Shared.Entities;
using DeliveryConfirmation.Shared.Entities.Entities;
using DeliveryConfirmation.Shared.Request;
using DeliveryConfirmation.Shared.Response;
using System;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;

namespace DeliveryConfirmation.Business.BO
{
    public class ShipmentsBO : IShipmentsBO
    {
        private readonly ContextFactory _factory;

        public ShipmentsBO(ContextFactory factory)
        {
            _factory = factory;
        }

        public async Task<PagedResponse<Shipment>> GetByTruck(int truckId, PagingRequest paging)
        {
            using (var context = _factory.CreateReadonlyDbContext())
            {
                var truck = await context.Trucks.FirstOrDefaultAsync(t => t.TruckId == truckId);
                if (truck != null)
                {
                    var shipments = await context.Shipments.Where(s => s.TruckId == truckId).ToPagedResponseAsync(paging);
                    return shipments;
                }
                return null;
            }
        }

        public async Task<Shipment> GetShipmentById(int shipmentId)
        {
            using (var context = _factory.CreateReadonlyDbContext())
            {
                var shipment = await context.Shipments.FirstOrDefaultAsync(s => s.ShipmentId == shipmentId);
                if (shipment != null)
                {
                    return shipment;
                }
                return null;
            }
        }

        public async Task<bool> UpdateStatus(int shipmentId, ShipmentStatuses newStatus)
        {
            using (var context = _factory.CreateDbContext())
            {
                var shipment = await context.Shipments.FirstOrDefaultAsync(s => s.ShipmentId == shipmentId);
                if (shipment != null)
                {
                    shipment.Status = newStatus;
                    var updated = await context.SaveChangesAsync();
                    return updated > 0;
                }
                return false;
            }
        }
    }
}
