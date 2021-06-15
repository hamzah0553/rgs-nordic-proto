using System;
using System.Collections.Generic;

namespace RgsNordic.Model
{
  public class Site
  {
    public Guid Id { get; set; }
    public string Name { get; set; }
    public int ColCount { get; set; }
    public int RowCount { get; set; }
    public virtual ICollection<SiteGridCell> SiteGridCells { get; set; }
  }
}