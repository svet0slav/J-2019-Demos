using DeliveryConfirmation.Shared.Request;
using DeliveryConfirmation.Shared.Response;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;

namespace DeliveryConfirmation.Business.Extensions
{
    public static class PaginationExtensions
    {

        public static IQueryable<T> ApplyPagination<T>(this IQueryable<T> result, PagingRequest paging)
        {
            if (paging == null)
            {
                paging = PagingRequest.Default();
            }

            if (paging.PageSize > 0)
            {
                result = result.Skip((paging.Page - 1) * paging.PageSize);
            }
            if (paging.PageSize > 0)
            {
                result = result.Take(paging.PageSize);
            }

            return result;
        }

        public static async Task<PagedResponse<TSource>> ToPagedResponseAsync<TSource>(
            this IQueryable<TSource> source,
            PagingRequest paging)
        {
            var total = await source.CountAsync();
            source = source.ApplyPagination(paging);
            var result = await source.ToListAsync();

            return new PagedResponse<TSource>()
            {
                TotalRecords = total,
                Records = result
            };
        }

    }
}