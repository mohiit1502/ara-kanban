import React, { useState, useRef, useEffect, useContext } from "react";
import { API_ROUTES } from "@config/constants";
import { Network } from "@utils";
import { KaContext } from "src/contexts/KaContext";
import "./AddTaskForm.component.scss"

interface AddTaskFormProps {
  statusOptions: StatusOption[];
  onCancel?: () => void;
}

const AddTaskForm = (props: AddTaskFormProps): JSX.Element => {
  const { statusOptions, onCancel } = props;
  const { setModal, currentBoard, setCurrentBoard } = useContext(KaContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(statusOptions[0]?.value || "");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  useEffect(() => {
    // If statusOptions change, reset status to first
    setStatus(statusOptions[0]?.value || "");
  }, [statusOptions]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title is required.");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      const boardId = currentBoard?.id;
      if (!boardId) throw new Error("No board selected");
      const url = API_ROUTES.TASKS.replace(":boardId", String(boardId));
      const payload = {
        title: title.trim(),
        description: description.trim(),
        status,
      };
      await Network.post(url, payload, {
        headers: { Authorization: "Bearer testtoken" },
      });
      setSubmitting(false);
      setTitle("");
      setDescription("");
      setStatus(statusOptions[0]?.value || "");
      setModal({ open: false, title: "", body: null });
      setCurrentBoard({ ...currentBoard }); // Trigger refresh in parent
    } catch (err: any) {
      setSubmitting(false);
      setError(err.message || "Failed to add task");
    }
  };

  const handleCancel = () => {
    setTitle("");
    setDescription("");
    setStatus(statusOptions[0]?.value || "");
    setError("");
    onCancel?.();
    setModal({ open: false, title: "", body: null });
  };

  return (
    <form className="c-AddTaskForm" onSubmit={handleSubmit} aria-label="Add New Task">
      <div className="c-AddTaskForm__field">
        <label htmlFor="task-title">Title<span style={{ color: 'red' }}>*</span></label>
        <input
          id="task-title"
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
          ref={titleRef}
          aria-describedby={error ? "task-title-error" : undefined}
        />
        {error && <div id="task-title-error" className="c-AddTaskForm__error">{error}</div>}
      </div>
      <div className="c-AddTaskForm__field">
        <label htmlFor="task-desc">Description</label>
        <textarea
          id="task-desc"
          value={description}
          onChange={e => setDescription(e.target.value)}
          rows={3}
        />
      </div>
      <div className="c-AddTaskForm__field">
        <label htmlFor="task-status">Status</label>
        <select
          id="task-status"
          value={status}
          onChange={e => setStatus(e.target.value)}
        >
          {statusOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
      <div className="c-AddTaskForm__actions">
        <button
          type="submit"
          className="c-AddTaskForm__submit"
          disabled={submitting}
          aria-busy={submitting}
        >
          {submitting ? "Adding..." : "Add Task"}
        </button>
        <button
          type="button"
          className="c-AddTaskForm__cancel"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddTaskForm;
