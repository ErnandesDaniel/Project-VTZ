using System.Collections;
using VTZProject.Backend.Models.RequestResults;

namespace VTZProject.Backend.Models.Extensions
{
    public static class ToRequestResultExtentions
    {
        public static RequestResult<T> ToRequestResult<T>(this T data, string errorMessage = "") where T : class
        {
            var count = data is IEnumerable items && data is not string ? items.Cast<object>().Count() : 1;
            return new RequestResult<T>()
            {
                State = (string.IsNullOrWhiteSpace(errorMessage) ? StateResult.Success : StateResult.Error).ToString(),
                ErrorDescription = errorMessage,
                Value = data,
                Count = count
            };
        }
    }
}
