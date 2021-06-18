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
using System.Linq;

namespace RgsNordic.Function
{
  public static class RgsNordicApi
  {
    [FunctionName("GetSites")]
    public static async Task<IActionResult> GetSites(
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

    [FunctionName("GetSite")]
    public static async Task<IActionResult> GetSite(
    [HttpTrigger(AuthorizationLevel.Function, "get", Route = "site/{id}")] HttpRequest req,
    ILogger log, string id)
    {

      log.LogInformation("C# HTTP trigger function processed a request.");
      Site site;
      using (var context = new RgsNordicContext())
      {
        site = await context.Sites.Include(s => s.SiteGridCells).Where(s => s.Id == Guid.Parse(id)).FirstOrDefaultAsync();
      }
      if (site == null)
      {
        return new NoContentResult();
      }
      return new OkObjectResult(site);

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

    [FunctionName("GetCells")]
    public static async Task<IActionResult> GetCells(
    [HttpTrigger(AuthorizationLevel.Function, "get", Route = "cell")] HttpRequest req,
    ILogger log)
    {

      log.LogInformation("C# HTTP trigger function processed a request.");
      List<SiteGridCell> cells;
      using (var context = new RgsNordicContext())
      {
        cells = await context.SiteGridCells.Include(s => s.Case).ToListAsync();
      }
      if (cells == null)
      {
        return new NoContentResult();
      }
      return new OkObjectResult(cells); 
    }

    
    [FunctionName("GetCell")]
    public static async Task<IActionResult> GetCell(
    [HttpTrigger(AuthorizationLevel.Function, "get", Route = "cell/{id}")] HttpRequest req,
    ILogger log, string id)
    {

      log.LogInformation("C# HTTP trigger function processed a request.");
      SiteGridCell cell;
      using (var context = new RgsNordicContext())
      {
        cell = await context.SiteGridCells.Include(sg => sg.Case).Where(s => s.Id == Guid.Parse(id)).FirstOrDefaultAsync();
      }
      if (cell == null)
      {
        return new NoContentResult();
      }
      return new OkObjectResult(cell);

    }

    [FunctionName("PostCell")]
    public static async Task<IActionResult> PostCell(
        [HttpTrigger(AuthorizationLevel.Function, "post", Route = "cell")] HttpRequest request,
        ILogger logger)
    {
      var requestBody = await new StreamReader(request.Body).ReadToEndAsync();
      SiteGridCell cell = JsonConvert.DeserializeObject<SiteGridCell>(requestBody);


      try
      {
        using (var context = new RgsNordicContext())
        {
          await context.SiteGridCells.AddAsync(cell);
          await context.SaveChangesAsync();
        }
      }
      catch (Exception e)
      {
        return new BadRequestObjectResult(e);
      }
      return new OkObjectResult(cell);

    }

    [FunctionName("GetConfig")]
    public static async Task<IActionResult> GetConfig(
        [HttpTrigger(AuthorizationLevel.Function, "get", Route = "config")] HttpRequest req,
        ILogger log)
    {
      var env = Environment.GetEnvironmentVariable("host");
      return new OkObjectResult(env);

    }
  }
}
