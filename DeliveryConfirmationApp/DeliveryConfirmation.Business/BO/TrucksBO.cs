using DeliveryConfirmation.Business.BO.Contract;
using DeliveryConfirmation.Business.Extensions;
using DeliveryConfirmation.Shared.Entities;
using DeliveryConfirmation.Shared.Entities.Entities;
using DeliveryConfirmation.Shared.Request;
using DeliveryConfirmation.Shared.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DeliveryConfirmation.Business.BO
{
    public class TrucksBO : ITrucksBO
    {
        private readonly ContextFactory _factory;

        public TrucksBO(ContextFactory factory)
        {
            _factory = factory;
        }

        public async Task<PagedResponse<Truck>> GetAll(PagingRequest paging)
        {
            using (var context = _factory.CreateReadonlyDbContext())
            {
                var query =
                    context.Trucks.OrderByDescending(t => t.TruckNumber);

                return await query.ToPagedResponseAsync(paging);
            }
        }
    }
}