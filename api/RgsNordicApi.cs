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
using RgsNordic.Dtos;

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
      var siteDto = new SiteDto()
      {
        Id = site.Id,
        Name = site.Name,
        ColCount = site.ColCount,
        RowCount = site.RowCount,
        SiteGridCells = site.SiteGridCells.Select(sc => new SiteGridCellDto()
        {
          Id = sc.Id,
          SiteId = sc.SiteId,
          Case = sc.Case == null ? null : new CaseDto() { Id = sc.Id, CaseId = sc.Case.CaseId, AmountOfWaste = sc.Case.AmountOfWaste },
          Col = sc.Col,
          Row = sc.Row,
        }).ToList(),
      };
      return new OkObjectResult(siteDto);

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
      Guid guidId;
      try
      {
        guidId = Guid.Parse(id);
      }
      catch (Exception)
      {
        return new NoContentResult();
      }

      log.LogInformation("C# HTTP trigger function processed a request.");
      SiteGridCell cell;
      using (var context = new RgsNordicContext())
      {
        cell = await context.SiteGridCells.Include(sg => sg.Case).Where(s => s.Id == guidId).FirstOrDefaultAsync();
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

      return new CreatedAtActionResult(nameof(PostCell), nameof(RgsNordic), new { id = cell.Id }, cell);
    }

    [FunctionName("SearchCell")]
    public static async Task<IActionResult> SearchCell(
        [HttpTrigger(AuthorizationLevel.Function, "post", Route = "cell/search")] HttpRequest request,
        ILogger logger)
    {
      var requestBody = await new StreamReader(request.Body).ReadToEndAsync();
      SiteGridCell cell = JsonConvert.DeserializeObject<SiteGridCell>(requestBody);

      try
      {
        using (var context = new RgsNordicContext())
        {
          cell = await context.SiteGridCells.Include(sg => sg.Case)
            .Where(sg => sg.Col == cell.Col && sg.Row == cell.Row && sg.SiteId == cell.SiteId)
            .FirstOrDefaultAsync();
        }
      }
      catch (Exception e)
      {
        return new BadRequestObjectResult(e);
      }

      return new OkObjectResult(cell);
    }

    [FunctionName("PutCase")]
    public static async Task<IActionResult> PutCase(
      [HttpTrigger(AuthorizationLevel.Function, "put", Route = "case")] HttpRequest request,
      ILogger logger)
    {
      var requestBody = await new StreamReader(request.Body).ReadToEndAsync();
      CaseDto cell = JsonConvert.DeserializeObject<CaseDto>(requestBody);
      try
      {
        using (var context = new RgsNordicContext())
        {
          var newCase = await context.Cases.FindAsync(cell.Id);
          if (true)
          {
              
          }
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
