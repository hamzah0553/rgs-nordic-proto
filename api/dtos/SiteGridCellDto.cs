using System;

namespace RgsNordic.Dtos
{
  public class SiteGridCellDto
  {
    public Guid Id { get; set; }
    public Guid SiteId { get; set; }
    public int Col { get; set; }
    public int Row { get; set; }
    public Guid? CaseId { get; set; }
    public CaseDto Case { get; set; }
  }
}