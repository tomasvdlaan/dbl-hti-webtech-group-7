mergeInto(LibraryManager.library, {
  onDeath: function()
  {
    die();
  },

  onLevelChange: function()
  {
    level_change();
  },

  onScoreChange: function()
  {
    score_change();
  }
})


// [DllImport("__Internal")]
// private static extern void onDeath();

// [DllImport("__Internal")]
// private static extern void onLevelChange();

// [DllImport("__Internal")]
// private static extern void onScoreChange();