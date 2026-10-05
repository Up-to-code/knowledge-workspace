# Knowledge workspace UI review

Method: direct review of the three screenshots supplied on this turn, plus the current thread-menu and composer source. The unslop CLI was attempted with three visual samples, but Claude exited with code 1 before producing a sample set. Counts below describe supplied references, not generated samples. No synthetic before/after comparison is claimed.

| Pattern | Evidence | Change |
| --- | --- | --- |
| Inline controls expand the sidebar and hide adjacent threads | Current ThreadList implementation; reference 1 uses one floating menu | Portal menu outside the scroll area; fixed anchor; outside-click and Escape close |
| Thread actions lack hierarchy | Reference 1 has three ordinary actions and a separated red Delete row | Open new tab, Rename, Pin; divider and red Delete; confirmation remains |
| Nested native textarea frame dominates the composer | Reference 2 shows a visible rectangular inner frame around the textarea | assistant-ui input removes native border, outline and shadow; only the outer composer is framed |
| Generic Send text is weak and poorly placed | Reference 2 has Send below an oversized input | Compact arrow button inside the composer; runtime-managed disabled and stop states |
| Resource source controls should read as ordinary tools | Reference 3 has subdued source and question buttons | Preserve compact controls, source URL, and original capture rather than promotional treatments |

Reference set: 3 screenshots. Menu layout: 1 reference. Composer defect: 1 reference. Resource control layout: 1 reference. This is a targeted review, not a statistically representative model-default analysis.
