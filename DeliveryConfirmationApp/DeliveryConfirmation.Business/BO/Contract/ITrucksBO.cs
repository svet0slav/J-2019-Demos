using DeliveryConfirmation.Shared.Entities.Entities;
using DeliveryConfirmation.Shared.Request;
using DeliveryConfirmation.Shared.Response;
using System.Threading.Tasks;

namespace DeliveryConfirmation.Business.BO.Contract
{
    public interface ITrucksBO
    {
        Task<PagedResponse<Truck>> GetAll(PagingRequest paging);
    }
}