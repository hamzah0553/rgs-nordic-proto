using System;
using System.Collections.Generic;

namespace RgsNordic.Dtos
{
  public class SiteDto
  {
    public Guid Id { get; set; }
    public string Name { get; set; }
    public int ColCount { get; set; }
    public int RowCount { get; set; }
    public List<SiteGridCellDto> SiteGridCells { get; set; }
  }

}