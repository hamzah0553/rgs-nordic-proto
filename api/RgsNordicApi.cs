using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Collections.Generic;
using RgsNordic.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace RgsNordic.Function
{
  public static class RgsNordicApi
  {
    [FunctionName("GetSite")]
    public static async Task<IActionResult> GetSite(
        [HttpTrigger(AuthorizationLevel.Function, "get", Route = "site")] HttpRequest req,
        ILogger log)
    {

      log.LogInformation("C# HTTP trigger function processed a request.");
      List<Site> sites;
      using (var context = new RgsNordicContext())
      {
        sites = await context.Sites.ToListAsync();
      }
      if (sites == null || sites.Count == 0)
      {
        return new NoContentResult();
      }
      return new OkObjectResult(sites);

    }

    [FunctionName("PostSite")]
    public static async Task<IActionResult> PostSite(
        [HttpTrigger(AuthorizationLevel.Function, "post", Route = "site")] HttpRequest request,
        ILogger logger)
    {
      var requestBody = await new StreamReader(request.Body).ReadToEndAsync();
      Site site = JsonConvert.DeserializeObject<Site>(requestBody);

      try
      {
        using (var context = new RgsNordicContext())
        {
          await context.Sites.AddAsync(site);
          await context.SaveChangesAsync();
        }
      }
      catch (Exception e)
      {
        return new BadRequestObjectResult(e);
      }
      return new OkObjectResult(site);
      
    }
  }
}
