namespace VTZProject.Backend.Models.RequestResults
{
    public class RequestResult<T>
        where T : class
    {
        public string State { get; set; }
        public string ErrorDescription { get; set; }
        public int Count { get; set; }

        public T Value { get; set; }
    }
}
